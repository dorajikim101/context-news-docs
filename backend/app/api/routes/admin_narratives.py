from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.api.admin_deps import require_admin
from app.models.narrative import Narrative
from app.models.claim import Claim, Evidence, Counterpoint, ActionSignal, ClaimEvidenceLink

router = APIRouter(prefix="/admin/narratives", tags=["admin-narratives"])


@router.get("/{narrative_id}")
def get_admin_narrative_detail(narrative_id: UUID, db: Session = Depends(get_db), _: None = Depends(require_admin)):
    narrative = db.get(Narrative, narrative_id)
    if not narrative:
        raise HTTPException(status_code=404, detail="Narrative not found")

    claims = db.query(Claim).filter(Claim.narrative_id == narrative_id).order_by(Claim.updated_at.desc()).all()
    counterpoints = db.query(Counterpoint).filter(Counterpoint.narrative_id == narrative_id).order_by(Counterpoint.updated_at.desc()).all()
    action_signals = db.query(ActionSignal).filter(ActionSignal.narrative_id == narrative_id).order_by(ActionSignal.updated_at.desc()).all()

    claim_ids = [c.id for c in claims]
    evidence = []
    if claim_ids:
        links = db.query(ClaimEvidenceLink).filter(ClaimEvidenceLink.claim_id.in_(claim_ids)).all()
        evidence_ids = [l.evidence_id for l in links]
        if evidence_ids:
            evidence = db.query(Evidence).filter(Evidence.id.in_(evidence_ids)).all()

    return {
        "narrative": narrative,
        "claims": claims,
        "counterpoints": counterpoints,
        "action_signals": action_signals,
        "evidence": evidence,
    }
