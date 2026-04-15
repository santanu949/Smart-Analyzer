from fastapi import APIRouter, HTTPException
from app.models.response_model import AnalysisRequest, AnalysisResponse, Vulnerability
from app.services.llm_service import analyze_with_llm
from app.services.slither_service import run_slither
from app.services.knowledge_service import retrieve_knowledge

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
            print(f"Slither failed: {slither_response.get('error')}")
            
        # Step 2: Knowledge Retrieval (RAG Mode Only)
        knowledge_context = ""
        actual_mode = request.mode
        
        if request.mode == "rag":
            try:
                knowledge_context = retrieve_knowledge(slither_findings)
                if not knowledge_context:
                    print("RAG: No specific knowledge found for these findings. Falling back to Groq.")
                    actual_mode = "groq"
            except Exception as rag_err:
                print(f"RAG Retrieval failed: {rag_err}. Falling back to Groq.")
                actual_mode = "groq"

        # Step 3: Use Groq LLM
        vulnerabilities_data = await analyze_with_llm(
            request.code, 
            slither_findings, 
            mode=actual_mode, 
            knowledge=knowledge_context
        )
        
        # Format list into Response Model
        vulnerabilities = []
        for v in vulnerabilities_data:
            vuln = Vulnerability(
                type=v.get("type") or v.get("name") or "Unknown Issue",
                severity=v.get("severity") or v.get("risk_level") or "Medium",
                explanation=v.get("explanation") or v.get("description") or "No explanation provided.",
                fix=v.get("fix") or v.get("suggested_fix") or "Review code manually.",
                impact=v.get("impact"),
                attack_flow=v.get("attack_flow"),
                code_fix=v.get("code_fix"),
                simulation=v.get("simulation")
            )
            vulnerabilities.append(vuln)
            
        return AnalysisResponse(vulnerabilities=vulnerabilities)

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))