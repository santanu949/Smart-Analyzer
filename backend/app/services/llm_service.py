import os
import json
from groq import AsyncGroq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Validate API key
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise Exception("GROQ_API_KEY not found in .env")

# Initialize Groq client
client = AsyncGroq(api_key=api_key)


async def analyze_with_llm(contract_code: str, slither_findings: str, mode: str = "groq", knowledge: str = "") -> list[dict]:
    """
    Sends contract code + Slither findings to Groq and returns structured vulnerabilities.
    Specialized prompts for Groq (Expert Auditor) and RAG (Security Assistant).
    """

    # Limit input size (prevents token issues)
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
    else: # RAG Mode
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

    try:
        response = await client.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {"role": "system", "content": system_prompt.strip()},
                {"role": "user", "content": user_prompt.strip()}
            ],
            temperature=0.2
        )

        # Extract response safely
        content = response.choices[0].message.content

        if not content:
            raise Exception("Empty response from LLM")

        # Debug (remove later)
        print("LLM RAW OUTPUT:", content)

        # Parse JSON safely
        try:
            result_json = json.loads(content)
            if isinstance(result_json, list):
                return result_json
            return result_json.get("vulnerabilities", [])
        except json.JSONDecodeError:
            return [{
                "type": "Parsing Error",
                "explanation": "LLM did not return valid JSON.",
                "severity": "low",
                "fix": "Retry analysis."
            }]

    except Exception as e:
        print(f"LLM Error: {e}")
        raise Exception(f"LLM analysis failed: {str(e)}")