from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.narrative import Narrative
from app.models.claim import Claim, Evidence, Counterpoint, ActionSignal

router = APIRouter(prefix="/overview", tags=["overview"])


@router.get("/narratives/{narrative_id}")
def get_narrative_overview(narrative_id: UUID, db: Session = Depends(get_db)):
    narrative = db.get(Narrative, narrative_id)
    if not narrative:
        raise HTTPException(status_code=404, detail="Narrative not found")

    claims = db.query(Claim).filter(Claim.narrative_id == narrative_id).order_by(Claim.updated_at.desc()).all()
    counterpoints = db.query(Counterpoint).filter(Counterpoint.narrative_id == narrative_id).order_by(Counterpoint.updated_at.desc()).all()
    actions = db.query(ActionSignal).filter(ActionSignal.narrative_id == narrative_id).order_by(ActionSignal.updated_at.desc()).all()

    claim_ids = [c.id for c in claims]
    evidence = db.query(Evidence).join(Claim, Claim.narrative_id == narrative_id).filter(Evidence.source_id.is_not(None)).limit(20).all() if claim_ids else []

    return {
        "narrative": narrative,
        "claims": claims,
        "counterpoints": counterpoints,
        "action_signals": actions,
        "evidence": evidence,
    }
