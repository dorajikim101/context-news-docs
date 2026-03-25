from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.api.admin_deps import require_admin
from app.models.narrative import Narrative
from app.schemas.narrative import NarrativeCreate, NarrativeRead, NarrativeUpdate

router = APIRouter(prefix="/narratives", tags=["narratives"])


@router.get("", response_model=list[NarrativeRead])
def list_narratives(db: Session = Depends(get_db)):
    return db.query(Narrative).order_by(Narrative.updated_at.desc()).all()


@router.get("/{narrative_id}", response_model=NarrativeRead)
def get_narrative(narrative_id: UUID, db: Session = Depends(get_db)):
    narrative = db.get(Narrative, narrative_id)
    if not narrative:
        raise HTTPException(status_code=404, detail="Narrative not found")
    return narrative


@router.post("", response_model=NarrativeRead)
def create_narrative(payload: NarrativeCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)):
    narrative = Narrative(**payload.model_dump())
    db.add(narrative)
    db.commit()
    db.refresh(narrative)
    return narrative


@router.patch("/{narrative_id}", response_model=NarrativeRead)
def update_narrative(narrative_id: UUID, payload: NarrativeUpdate, db: Session = Depends(get_db), _: None = Depends(require_admin)):
    narrative = db.get(Narrative, narrative_id)
    if not narrative:
        raise HTTPException(status_code=404, detail="Narrative not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(narrative, key, value)
    db.commit()
    db.refresh(narrative)
    return narrative
