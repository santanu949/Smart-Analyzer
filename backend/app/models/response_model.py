from pydantic import BaseModel
from typing import List

class Vulnerability(BaseModel):
    name: str
    explanation: str
    risk_level: str
    suggested_fix: str

class AnalysisRequest(BaseModel):
    code: str

class AnalysisResponse(BaseModel):
    vulnerabilities: List[Vulnerability]