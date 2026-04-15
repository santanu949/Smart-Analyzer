from fastapi import APIRouter, HTTPException
from app.models.response_model import AnalysisRequest, AnalysisResponse, Vulnerability
from app.services.llm_service import analyze_with_llm
from app.services.slither_service import run_slither
import json

router = APIRouter()

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_contract(request: AnalysisRequest):
    if not request.code or len(request.code.strip()) == 0:
        raise HTTPException(status_code=400, detail="Contract code cannot be empty.")
        
    try:
        # Step 1: Attempt Slither Analysis
        slither_response = run_slither(request.code)
        slither_findings = ""
        
        if slither_response.get("success"):
            slither_findings = json.dumps(slither_response.get("data", {}))
        else:
            print(f"Slither failed or not installed, falling back to LLM exclusively: {slither_response.get('error')}")
            # we just leave slither_findings as empty string so groq can handle it raw
            
        # Step 2: Use Groq LLM
        vulnerabilities_data = await analyze_with_llm(request.code, slither_findings)
        
        # Format list into Response Model
        vulnerabilities = []
        for v in vulnerabilities_data:
            vuln = Vulnerability(
                name=v.get("name", "Unknown Issue"),
                explanation=v.get("explanation", "No explanation provided."),
                risk_level=v.get("risk_level", "Medium"),
                suggested_fix=v.get("suggested_fix", "Review code manually.")
            )
            vulnerabilities.append(vuln)
            
        return AnalysisResponse(vulnerabilities=vulnerabilities)

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))