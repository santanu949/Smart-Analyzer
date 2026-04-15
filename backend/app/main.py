from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import analyze

app = FastAPI(title="NexusScan AI API", version="1.0.0")

# Configure CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Wildcard for local development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the analysis routes
app.include_router(analyze.router, prefix="/api")

@app.get("/")
def health_check():
    return {"status": "Backend is running, NexusScan API is live."}