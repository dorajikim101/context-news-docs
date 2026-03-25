from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.narrative import NarrativeSnapshot, Narrative

router = APIRouter(prefix="/snapshots", tags=["snapshots"])


@router.get("/narratives/{slug}")
def get_narrative_snapshots(slug: str, db: Session = Depends(get_db)):
    narrative = db.query(Narrative).filter(Narrative.slug == slug).first()
    if not narrative:
        return []
    return (
        db.query(NarrativeSnapshot)
        .filter(NarrativeSnapshot.narrative_id == narrative.id)
        .order_by(NarrativeSnapshot.snapshot_date.asc())
        .all()
    )
