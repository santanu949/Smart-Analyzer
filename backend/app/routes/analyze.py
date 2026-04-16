import json

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
        # ── Step 1: Slither static analysis ──────────────────────────────────
        slither_response = run_slither(request.code)
        slither_findings = ""

        if slither_response.get("success"):
            slither_findings = json.dumps(slither_response.get("data", {}))
        else:
            print(f"Slither failed (non-fatal): {slither_response.get('error')}")

        # ── Step 2: Knowledge retrieval (RAG mode only) ───────────────────────
        knowledge_context = ""
        actual_mode = request.mode

        if request.mode == "rag":
            try:
                knowledge_context = retrieve_knowledge(slither_findings)
                if not knowledge_context:
                    print("RAG: No specific knowledge found — falling back to Groq.")
                    actual_mode = "groq"
            except Exception as rag_err:
                print(f"RAG retrieval failed: {rag_err} — falling back to Groq.")
                actual_mode = "groq"

        # ── Step 3: LLM analysis ──────────────────────────────────────────────
        vulnerabilities_data = await analyze_with_llm(
            request.code,
            slither_findings,
            mode=actual_mode,
            knowledge=knowledge_context,
        )

        # ── Step 4: Build response ────────────────────────────────────────────
        # All providers now return the unified Groq-compatible schema.
        vulnerabilities = []
        for v in vulnerabilities_data:
            vuln = Vulnerability(
                type=v.get("type") or "Unknown Issue",
                severity=v.get("severity") or "Medium",
                explanation=v.get("explanation") or None,
                impact=v.get("impact") or None,
                fix=v.get("fix") or None,
                attack_flow=v.get("attack_flow") or None,
                code_fix=v.get("code_fix") or None,
                simulation=v.get("simulation") or None,
            )
            vulnerabilities.append(vuln)

        return AnalysisResponse(
            vulnerabilities=vulnerabilities,
            mode_used=actual_mode,
        )

    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))