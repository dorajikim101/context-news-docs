from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.models.claim import Claim
from app.schemas.claim import ClaimCreate, ClaimRead, ClaimUpdate

router = APIRouter(prefix="/claims", tags=["claims"])


@router.get("", response_model=list[ClaimRead])
def list_claims(db: Session = Depends(get_db)):
    return db.query(Claim).order_by(Claim.updated_at.desc()).all()


@router.post("", response_model=ClaimRead)
def create_claim(payload: ClaimCreate, db: Session = Depends(get_db)):
    claim = Claim(**payload.model_dump())
    db.add(claim)
    db.commit()
    db.refresh(claim)
    return claim


@router.patch("/{claim_id}", response_model=ClaimRead)
def update_claim(claim_id: UUID, payload: ClaimUpdate, db: Session = Depends(get_db)):
    claim = db.get(Claim, claim_id)
    if not claim:
        raise HTTPException(status_code=404, detail="Claim not found")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(claim, key, value)
    db.commit()
    db.refresh(claim)
    return claim
