from fastapi import FastAPI
from app.api.routes.sources import router as sources_router
from app.api.routes.narratives import router as narratives_router
from app.api.routes.claims import router as claims_router

app = FastAPI(title="Context News API", version="0.1.0")

app.include_router(sources_router)
app.include_router(narratives_router)
app.include_router(claims_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Context News backend scaffold"}
