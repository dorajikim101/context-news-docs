from fastapi import FastAPI
from app.api.routes.sources import router as sources_router
from app.api.routes.narratives import router as narratives_router
from app.api.routes.claims import router as claims_router
from app.api.routes.evidence import router as evidence_router
from app.api.routes.counterpoints import router as counterpoints_router
from app.api.routes.action_signals import router as action_signals_router
from app.api.routes.public import router as public_router
from app.api.routes.overview import router as overview_router
from app.api.routes.preferences import router as preferences_router
from app.api.routes.relations import router as relations_router
from app.api.routes.admin_narratives import router as admin_narratives_router
from app.api.routes.snapshots import router as snapshots_router

app = FastAPI(title="Context News API", version="0.1.0")

app.include_router(sources_router)
app.include_router(narratives_router)
app.include_router(claims_router)
app.include_router(evidence_router)
app.include_router(counterpoints_router)
app.include_router(action_signals_router)
app.include_router(public_router)
app.include_router(overview_router)
app.include_router(preferences_router)
app.include_router(relations_router)
app.include_router(admin_narratives_router)
app.include_router(snapshots_router)


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok"}


@app.get("/")
def root() -> dict[str, str]:
    return {"message": "Context News backend scaffold"}
