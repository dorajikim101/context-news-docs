from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.claim import Evidence
from app.schemas.evidence import EvidenceCreate, EvidenceRead, EvidenceUpdate

router = APIRouter(prefix="/evidence", tags=["evidence"])


@router.get("", response_model=list[EvidenceRead])
def list_evidence(db: Session = Depends(get_db)):
    return db.query(Evidence).order_by(Evidence.created_at.desc()).all()


@router.post("", response_model=EvidenceRead)
def create_evidence(payload: EvidenceCreate, db: Session = Depends(get_db)):
    item = Evidence(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{evidence_id}", response_model=EvidenceRead)
def update_evidence(evidence_id: UUID, payload: EvidenceUpdate, db: Session = Depends(get_db)):
    item = db.get(Evidence, evidence_id)
    if not item:
        raise HTTPException(status_code=404, detail="Evidence not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item
