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


async def analyze_with_llm(contract_code: str, slither_findings: str) -> list[dict]:
    """
    Sends contract code + Slither findings to Groq and returns structured vulnerabilities.
    """

    # Limit input size (prevents token issues)
    contract_code = contract_code[:3000]
    slither_findings = slither_findings[:2000]

    system_prompt = """
You are a smart contract security auditor.

You MUST respond ONLY in valid JSON.

Format:
{
  "vulnerabilities": [
    {
      "name": "...",
      "explanation": "...",
      "risk_level": "Low | Medium | High",
      "suggested_fix": "..."
    }
  ]
}
"""

    user_prompt = f"""
Code:
{contract_code}

Static Analysis Findings:
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
        except json.JSONDecodeError:
            return [{
                "name": "Parsing Error",
                "explanation": "LLM did not return valid JSON.",
                "risk_level": "Low",
                "suggested_fix": "Retry analysis."
            }]

        return result_json.get("vulnerabilities", [])

    except Exception as e:
        print(f"LLM Error: {e}")
        raise Exception(f"LLM analysis failed: {str(e)}")