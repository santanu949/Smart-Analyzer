from pydantic import BaseModel
from typing import List, Optional

class Vulnerability(BaseModel):
    type: str
    severity: str
    explanation: str
    impact: Optional[str] = None
    fix: str
    attack_flow: Optional[List[str]] = None
    code_fix: Optional[str] = None
    simulation: Optional[List[str]] = None

class AnalysisRequest(BaseModel):
    code: str
    mode: str = "groq" # Default to standard mode

class AnalysisResponse(BaseModel):
    vulnerabilities: List[Vulnerability]