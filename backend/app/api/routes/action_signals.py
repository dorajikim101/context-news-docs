from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.api.admin_deps import require_admin
from app.models.claim import ActionSignal
from app.schemas.action_signal import ActionSignalCreate, ActionSignalRead, ActionSignalUpdate

router = APIRouter(prefix="/action-signals", tags=["action-signals"])


@router.get("", response_model=list[ActionSignalRead])
def list_action_signals(db: Session = Depends(get_db), _: None = Depends(require_admin)):
    return db.query(ActionSignal).order_by(ActionSignal.created_at.desc()).all()


@router.post("", response_model=ActionSignalRead)
def create_action_signal(payload: ActionSignalCreate, db: Session = Depends(get_db), _: None = Depends(require_admin)):
    item = ActionSignal(**payload.model_dump())
    db.add(item)
    db.commit()
    db.refresh(item)
    return item


@router.patch("/{signal_id}", response_model=ActionSignalRead)
def update_action_signal(signal_id: UUID, payload: ActionSignalUpdate, db: Session = Depends(get_db), _: None = Depends(require_admin)):
    item = db.get(ActionSignal, signal_id)
    if not item:
        raise HTTPException(status_code=404, detail="Action signal not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(item, key, value)
    db.commit()
    db.refresh(item)
    return item
