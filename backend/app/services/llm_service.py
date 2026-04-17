import os
import re
import json
import httpx
from groq import AsyncGroq
from dotenv import load_dotenv
from pathlib import Path

# Resolve .env: services/ -> app/ -> backend/
_ENV_PATH = Path(__file__).resolve().parent.parent.parent / ".env"
load_dotenv(dotenv_path=_ENV_PATH)

# ── Groq config ─────────────────────────────────────────────────────────────
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise Exception("GROQ_API_KEY not found in .env")

groq_client = AsyncGroq(api_key=GROQ_API_KEY)

# ── Ollama config ────────────────────────────────────────────────────────────
OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "gemma4:e4b")

# 10-minute read timeout to allow the local model time to infer
_OLLAMA_TIMEOUT = httpx.Timeout(connect=10.0, read=600.0, write=30.0, pool=10.0)

# Cached availability flag — avoids hitting /api/tags on every request
_ollama_model_verified = False


# ────────────────────────────────────────────────────────────────────────────
# Shared helpers
# ────────────────────────────────────────────────────────────────────────────

def _strip_markdown_fences(text: str) -> str:
    """Remove ```json … ``` or ``` … ``` wrappers that some models add."""
    cleaned = text.strip()
    # Remove opening fence (e.g. ```json or ```)
    cleaned = re.sub(r'^```[a-zA-Z]*\s*', '', cleaned).strip()
    # Remove closing fence
    cleaned = re.sub(r'\s*```$', '', cleaned).strip()
    return cleaned


# ────────────────────────────────────────────────────────────────────────────
# GROQ / RAG mode
# ────────────────────────────────────────────────────────────────────────────

async def analyze_with_groq(
    contract_code: str,
    slither_findings: str,
    mode: str = "groq",        # "groq" or "rag"
    knowledge: str = "",
) -> list[dict]:
    """
    Send the contract to Groq (llama-3.3-70b-versatile).
    Returns a list of vulnerability dicts in the Groq/RAG schema.
    """
    # Limit input size to avoid token issues
    contract_code = contract_code[:3000]
    slither_findings = slither_findings[:2000]

    if mode == "groq":
        system_prompt = """
You are an expert smart contract security auditor. Analyze the given Solidity contract vulnerabilities in depth.

INSTRUCTIONS:
For each vulnerability:
- Identify the issue clearly
- Provide a detailed explanation
- Describe the attack flow step-by-step
- Explain real-world impact
- Provide a correct fix
- Provide corrected code snippet

CRITICAL OUTPUT RULES:
- Return ONLY valid JSON
- Do NOT include any text outside JSON
- Do NOT use markdown or comments
- Do NOT break the structure

STRICT OUTPUT FORMAT:
[
  {
    "type": "string",
    "severity": "low | medium | high | critical",
    "explanation": "detailed explanation (8–15 lines)",
    "attack_flow": [
      "step 1",
      "step 2",
      "step 3"
    ],
    "impact": "real-world impact",
    "fix": "clear fix explanation",
    "code_fix": "corrected solidity snippet",
    "simulation": [
      "step 1",
      "step 2"
    ]
  }
]
"""
        user_prompt = f"""
Solidity contract code:
{contract_code}

Detected vulnerabilities (from Slither):
{slither_findings}
"""
    else:  # RAG mode
        system_prompt = """
You are a smart contract security assistant using a predefined knowledge base. Your job is to explain vulnerabilities clearly and concisely using structured knowledge.

INSTRUCTIONS:
For each vulnerability:
- Identify the vulnerability pattern
- Explain it clearly in 6–10 lines
- Use provided knowledge context
- Provide a short and correct fix

CRITICAL OUTPUT RULES:
- Return ONLY valid JSON
- Do NOT include any text outside JSON
- Do NOT use markdown or comments

STRICT OUTPUT FORMAT:
[
  {
    "type": "string",
    "severity": "low | medium | high | critical",
    "explanation": "clear explanation (6–10 lines)",
    "fix": "short actionable fix",
    "simulation": [
      "step 1",
      "step 2"
    ]
  }
]
"""
        user_prompt = f"""
Expert Knowledge Context:
{knowledge}

Solidity contract code:
{contract_code}

Detected vulnerabilities (from Slither):
{slither_findings}
"""

    response = await groq_client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "system", "content": system_prompt.strip()},
            {"role": "user", "content": user_prompt.strip()},
        ],
        temperature=0.2,
    )

    content = response.choices[0].message.content
    if not content:
        raise Exception("Empty response from Groq LLM")

    print("GROQ RAW OUTPUT:", content[:500])

    # Use the same robust multi-strategy extractor used for Ollama
    result_json = _extract_json_from_text(content)

    if result_json is None:
        # Last resort: ask Groq again with response_format json_object
        print("GROQ PARSE FAILED — retrying with json response_format...")
        retry_response = await groq_client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt.strip()},
                {"role": "user", "content": user_prompt.strip()},
                {"role": "assistant", "content": content},
                {"role": "user", "content": "Your response was not valid JSON. Return ONLY the raw JSON array, nothing else."},
            ],
            temperature=0.0,
        )
        retry_content = retry_response.choices[0].message.content or ""
        result_json = _extract_json_from_text(retry_content)

    if result_json is None:
        print("GROQ PARSE FAILED after retry — returning error placeholder")
        return [
            {
                "type": "Parsing Error",
                "explanation": "LLM did not return valid JSON after two attempts.",
                "severity": "low",
                "fix": "Retry analysis or reduce the contract size.",
            }
        ]

    if isinstance(result_json, list):
        return result_json
    # Handle wrapped objects like {"vulnerabilities": [...]}
    if isinstance(result_json, dict):
        return (
            result_json.get("vulnerabilities")
            or result_json.get("issues")
            or result_json.get("results")
            or next((v for v in result_json.values() if isinstance(v, list)), [])
        )
    return []


# ────────────────────────────────────────────────────────────────────────────
# Ollama mode (gemma4:e4b — runs locally)
# ────────────────────────────────────────────────────────────────────────────

# Ollama system prompt now uses the EXACT same schema as Groq so the frontend
# receives identical data regardless of which provider was used.
OLLAMA_SYSTEM_PROMPT = """You are a smart contract security auditor. Output ONLY a raw JSON array — no text before or after it.

RULES:
- Begin with [ and end with ]
- No markdown, no code fences, no prose
- Empty result: []
- Keep explanation to 3-4 sentences max to avoid truncation

JSON SCHEMA (one object per vulnerability):
[
  {
    "type": "<vulnerability name>",
    "severity": "<low|medium|high|critical>",
    "explanation": "<3-4 sentence technical explanation>",
    "attack_flow": ["<step 1>", "<step 2>", "<step 3>"],
    "impact": "<one sentence on real-world risk>",
    "fix": "<1-2 sentence actionable fix>",
    "code_fix": "<corrected Solidity snippet>",
    "simulation": ["<sim step 1>", "<sim step 2>"]
  }
]

Field names ONLY: type, severity, explanation, attack_flow, impact, fix, code_fix, simulation""".strip()


def _build_ollama_user_prompt(contract_code: str, slither_findings: str) -> str:
    # Keep inputs small so the model has maximum token budget for JSON output.
    # Truncation of the JSON output (not the input) is the #1 cause of parse errors.
    contract_code = contract_code[:1500]
    slither_findings = slither_findings[:500]
    base = (
        f"Analyze this Solidity contract for security vulnerabilities.\n"
        f"Return ONLY a JSON array. Each item must have: "
        f"type (string), severity (low/medium/high/critical), "
        f"explanation (3-4 sentences), attack_flow (3 strings), "
        f"impact (1 sentence), fix (1-2 sentences), "
        f"code_fix (corrected snippet), simulation (2 strings).\n"
        f"No prose. No markdown. Start with [ and end with ].\n\n"
        f"Contract:\n{contract_code}"
    )
    if slither_findings:
        base += f"\n\nSlither hints:\n{slither_findings}"
    return base.strip()


def _repair_truncated_json(text: str) -> list | None:
    """
    Last-resort repair for JSON arrays that were cut off mid-token.
    Collects all complete {...} objects found inside the partial array.
    """
    objects = []
    depth = 0
    start = None
    in_string = False
    escape = False

    for i, ch in enumerate(text):
        if escape:
            escape = False
            continue
        if ch == '\\' and in_string:
            escape = True
            continue
        if ch == '"':
            in_string = not in_string
            continue
        if in_string:
            continue
        if ch == '{':
            if depth == 0:
                start = i
            depth += 1
        elif ch == '}':
            depth -= 1
            if depth == 0 and start is not None:
                candidate = text[start:i + 1]
                try:
                    obj = json.loads(candidate)
                    if isinstance(obj, dict):
                        objects.append(obj)
                except json.JSONDecodeError:
                    pass
                start = None

    return objects if objects else None


def _close_partial_json_array(text: str) -> list | None:
    """
    Attempt to close a truncated JSON array cut off mid-object.
    Searches backwards for the last valid JSON boundary and closes there.
    Handles the case where Ollama is cut off inside the very first object.
    """
    arr_start = text.find('[')
    if arr_start == -1:
        return None
    partial = text[arr_start:]

    # Walk backwards through partial output looking for a position where
    # appending '}]' produces valid JSON (handles mid-string truncation).
    # Cap iterations to avoid O(n^2) on huge strings.
    step = max(1, len(partial) // 400)
    for trim_pos in range(len(partial), max(arr_start, 2), -step):
        candidate = partial[:trim_pos].rstrip().rstrip(',') + '}]'
        try:
            result = json.loads(candidate)
            if isinstance(result, list) and result:
                print(f"OLLAMA CLOSE-REPAIR: closed partial array, recovered {len(result)} object(s)")
                return result
        except (json.JSONDecodeError, ValueError):
            continue
    return None


def _extract_json_from_text(text: str) -> list | dict | None:
    """
    Robustly extract a JSON array or object from model output that may contain
    leading/trailing text, markdown fences, or partial prose. Falls back to
    repairing truncated arrays when the JSON is cut off mid-token.
    """
    # 1. Strip fences and try direct parse
    cleaned = _strip_markdown_fences(text).strip()
    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        pass

    # 2. Try array first: slice from first [ to last ]
    start_arr = cleaned.find('[')
    end_arr = cleaned.rfind(']')
    if start_arr != -1 and end_arr != -1 and end_arr > start_arr:
        candidate = cleaned[start_arr:end_arr + 1]
        try:
            return json.loads(candidate)
        except json.JSONDecodeError:
            pass

    # 3. Try object: slice from first { to last }
    start = cleaned.find('{')
    end = cleaned.rfind('}')
    if start != -1 and end != -1 and end > start:
        candidate = cleaned[start:end + 1]
        try:
            return json.loads(candidate)
        except json.JSONDecodeError:
            pass

    # 4. Greedy regex scan for any complete JSON object
    for match in re.finditer(r'\{[\s\S]+?\}', cleaned):
        try:
            result = json.loads(match.group())
            if isinstance(result, dict):
                return result
        except json.JSONDecodeError:
            continue

    # 5. Collect all complete {...} objects from a partial/truncated array
    if '[' in cleaned:
        repaired = _repair_truncated_json(cleaned[cleaned.find('['):])
        if repaired:
            print(f"OLLAMA TRUNCATION REPAIR: salvaged {len(repaired)} complete object(s)")
            return repaired

    # 6. Close-repair: close a partial object mid-truncation (handles cut inside the very first object)
    if '[' in cleaned:
        closed = _close_partial_json_array(cleaned)
        if closed:
            return closed

    return None


def _parse_ollama_vulnerabilities(content: str) -> list[dict]:
    """
    Parse JSON from Ollama response and normalise ALL field names to exactly
    match the Groq schema so the frontend receives identical data.

    Groq schema: type, severity, explanation, fix, attack_flow, impact, code_fix, simulation
    Ollama now outputs the same schema, but we still handle legacy keys as fallbacks.
    """
    if not content:
        raise Exception("Empty response from Ollama")

    print("OLLAMA RAW OUTPUT:", content[:500])

    result_json = _extract_json_from_text(content)

    if result_json is None:
        print("OLLAMA PARSE FAILED — could not extract JSON from:", content[:300])
        return [
            {
                "type": "Parsing Error",
                "severity": "low",
                "explanation": f"Ollama returned non-JSON output. Raw: {content[:200]}",
                "fix": "Try again or reduce the contract size.",
            }
        ]

    # Handle both a JSON array [] and any object wrapper {"vulnerabilities": [...], "data": [...], etc.}
    if isinstance(result_json, list):
        raw_vulns = result_json
    elif isinstance(result_json, dict):
        # Try common keys first, then fall back to any list value in the object
        raw_vulns = (
            result_json.get("vulnerabilities")
            or result_json.get("issues")
            or result_json.get("results")
            or result_json.get("data")
            or next((v for v in result_json.values() if isinstance(v, list)), [])
        )
    else:
        raw_vulns = []

    if not isinstance(raw_vulns, list):
        raw_vulns = []

    normalised = []
    for v in raw_vulns:
        if not isinstance(v, dict):
            continue

        print("OLLAMA VULN FIELDS:", list(v.keys()))

        # explanation: try all known field name variants
        explanation = (
            v.get("explanation")
            or v.get("description")
            or v.get("details")
            or v.get("detail")
            or v.get("info")
            or v.get("summary")
            or v.get("content")
            or v.get("analysis")
            or ""
        ) or None

        # fix: try all known field name variants
        fix = (
            v.get("fix")
            or v.get("recommendation")
            or v.get("suggested_fix")
            or v.get("remediation")
            or v.get("mitigation")
            or v.get("solution")
            or v.get("patch")
            or v.get("resolution")
            or ""
        ) or None

        # attack_flow: accept list or comma-string
        attack_flow = v.get("attack_flow") or v.get("attack") or v.get("flow") or None
        if isinstance(attack_flow, str):
            attack_flow = [s.strip() for s in attack_flow.split(",") if s.strip()]

        # simulation: accept list or comma-string
        simulation = v.get("simulation") or v.get("exploit") or None
        if isinstance(simulation, str):
            simulation = [s.strip() for s in simulation.split(",") if s.strip()]

        normalised.append({
            "type":        v.get("type") or v.get("name") or v.get("vulnerability") or "Unknown Issue",
            "severity":    v.get("severity") or v.get("risk_level") or v.get("risk") or "Medium",
            "explanation": explanation,
            "fix":         fix,
            "attack_flow": attack_flow,
            "impact":      v.get("impact") or v.get("consequence") or v.get("effect") or None,
            "code_fix":    v.get("code_fix") or v.get("fixed_code") or v.get("corrected_code") or None,
            "simulation":  simulation,
        })

    return normalised


async def _ensure_ollama_ready() -> None:
    """One-shot check: is Ollama running and is the model pulled?"""
    global _ollama_model_verified
    if _ollama_model_verified:
        return

    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            r = await client.get(f"{OLLAMA_BASE_URL}/api/tags")
            r.raise_for_status()
            models = [m["name"] for m in r.json().get("models", [])]
    except httpx.ConnectError:
        raise Exception(
            f"Ollama is not running at {OLLAMA_BASE_URL}. "
            "Start it with: `ollama serve`"
        )
    except Exception as e:
        raise Exception(f"Ollama connectivity check failed: {str(e) or repr(e)}")

    available = any(
        m == OLLAMA_MODEL or m.split(":")[0] == OLLAMA_MODEL.split(":")[0]
        for m in models
    )
    if not available:
        raise Exception(
            f"Model '{OLLAMA_MODEL}' is not pulled in Ollama. "
            f"Run: `ollama pull {OLLAMA_MODEL}`. "
            f"Available models: {models or 'none'}"
        )

    _ollama_model_verified = True


async def analyze_with_ollama(
    contract_code: str,
    slither_findings: str,
) -> list[dict]:
    """
    Analyze a Solidity contract using the local Ollama instance (gemma4:e4b).
    Returns a list of vulnerability dicts in the SAME schema as Groq.
    """
    await _ensure_ollama_ready()

    payload = {
        "model": OLLAMA_MODEL,
        "messages": [
            {"role": "system", "content": OLLAMA_SYSTEM_PROMPT},
            {"role": "user",   "content": _build_ollama_user_prompt(contract_code, slither_findings)},
        ],
        "stream": False,
        # NOTE: Do NOT set "format": "json" here — it forces a JSON *object* {}
        # which conflicts with our prompt asking for a JSON *array* [].
        # Without it, the model respects the system prompt and returns the array directly.
        "options": {
            "temperature": 0.1,
            "num_ctx":     8192,   # large context window
            "num_predict": 8192,  # MUST be large — truncation mid-JSON causes parse errors
        },
    }

    try:
        async with httpx.AsyncClient(timeout=_OLLAMA_TIMEOUT) as client:
            response = await client.post(f"{OLLAMA_BASE_URL}/api/chat", json=payload)

        data = response.json()
        if "error" in data:
            raise Exception(f"Ollama model error: {data['error']}")

        response.raise_for_status()

        content = data.get("message", {}).get("content", "")
        if not content:
            raise Exception(
                f"Ollama returned an empty response. "
                f"Check that '{OLLAMA_MODEL}' is fully loaded and supported."
            )

        return _parse_ollama_vulnerabilities(content)

    except (httpx.ReadTimeout, httpx.TimeoutException):
        raise Exception(
            f"Ollama timed out. The model '{OLLAMA_MODEL}' is taking too long — "
            "try reducing the contract size."
        )
    except httpx.ConnectError:
        raise Exception(
            f"Cannot connect to Ollama at {OLLAMA_BASE_URL}. "
            "Make sure Ollama is running (`ollama serve`)."
        )
    except httpx.HTTPStatusError as e:
        raise Exception(
            f"Ollama HTTP {e.response.status_code}: {e.response.text or 'no details'}"
        )
    except Exception as e:
        msg = str(e) or repr(e)
        print(f"Ollama LLM Error: {msg}")
        raise Exception(f"Ollama analysis failed: {msg}")


# ────────────────────────────────────────────────────────────────────────────
# Unified entry point (called by the route)
# ────────────────────────────────────────────────────────────────────────────

async def analyze_with_llm(
    contract_code: str,
    slither_findings: str,
    mode: str = "groq",    # "groq" | "rag" | "ollama"
    knowledge: str = "",
) -> list[dict]:
    """
    Route the analysis request to the correct LLM provider.

    Returns a list of vulnerability dicts. All modes now return the same schema:
      { type, severity, explanation, fix, attack_flow, impact, code_fix, simulation }
    """
    if mode == "ollama":
        return await analyze_with_ollama(contract_code, slither_findings)

    # groq / rag both go through Groq API
    try:
        return await analyze_with_groq(contract_code, slither_findings, mode=mode, knowledge=knowledge)
    except Exception as e:
        print(f"LLM Error ({mode}): {e}")
        raise Exception(f"LLM analysis failed: {str(e)}")