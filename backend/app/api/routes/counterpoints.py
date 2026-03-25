from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.api.admin_deps import require_admin
from app.models.claim import Counterpoint
from app.schemas.counterpoint import CounterpointCreate, CounterpointRead, CounterpointUpdate

router = APIRouter(prefix="/counterpoints", tags=["counterpoints"])


@router.get("", response_model=list[CounterpointRead])
def list_counterpoints(db: Session = Depends(get_db), _: None = Depends(require_admin)):
    return db.query(Counterpoint).order_by(Counterpoint.created_at.desc()).all()


@router.post("", response_model=CounterpointRead)
def create_counterpoint(payload: CounterpointCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)):
    item = Counterpoint(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{counterpoint_id}", response_model=CounterpointRead)
def update_counterpoint(counterpoint_id: UUID, payload: CounterpointUpdate, db: Session = Depends(get_db), _: None = Depends(require_admin)):
    item = db.get(Counterpoint, counterpoint_id)
    if not item:
        raise HTTPException(status_code=404, detail="Counterpoint not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item
