from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.narrative import Narrative

router = APIRouter(prefix="/public", tags=["public"])


@router.get("/narratives")
def list_public_narratives(db: Session = Depends(get_db)):
    rows = db.query(Narrative).filter(Narrative.is_public.is_(True)).order_by(Narrative.updated_at.desc()).all()
    return rows


@router.get("/narratives/{slug}")
def get_public_narrative(slug: str, db: Session = Depends(get_db)):
    row = db.query(Narrative).filter(Narrative.slug == slug, Narrative.is_public.is_(True)).first()
    if not row:
        raise HTTPException(status_code=404, detail="Narrative not found")
    return row
