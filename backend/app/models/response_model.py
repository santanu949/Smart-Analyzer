from pydantic import BaseModel
from typing import List, Optional


class Vulnerability(BaseModel):
    """
    Unified vulnerability schema used by ALL providers (Groq, RAG, Ollama).
    Ollama's output is normalised server-side before this model is populated.
    """
    type: str
    severity: str
    explanation: Optional[str] = None       # primary analysis text
    impact: Optional[str] = None            # real-world impact
    fix: Optional[str] = None               # actionable fix description
    attack_flow: Optional[List[str]] = None # step-by-step attack steps
    code_fix: Optional[str] = None          # corrected Solidity snippet
    simulation: Optional[List[str]] = None  # execution simulation steps


class AnalysisRequest(BaseModel):
    code: str
    mode: str = "groq"   # "groq" | "rag" | "ollama"


class AnalysisResponse(BaseModel):
    vulnerabilities: List[Vulnerability]
    mode_used: Optional[str] = None