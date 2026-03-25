from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.deps import get_db
from app.api.admin_deps import require_admin
from app.models.narrative import NarrativeRelation

router = APIRouter(prefix="/relations", tags=["relations"])


@router.get("/narratives/{narrative_id}")
def list_relations(narrative_id: str, db: Session = Depends(get_db)):
    return db.query(NarrativeRelation).filter(NarrativeRelation.from_narrative_id == narrative_id).all()


@router.post("")
def create_relation(payload: dict, db: Session = Depends(get_db), _: None = Depends(require_admin)):
    required = ["from_narrative_id", "to_narrative_id", "relation_type"]
    if any(k not in payload for k in required):
        raise HTTPException(status_code=400, detail="Missing required fields")
    item = NarrativeRelation(
        from_narrative_id=payload["from_narrative_id"],
        to_narrative_id=payload["to_narrative_id"],
        relation_type=payload["relation_type"],
        confidence=payload.get("confidence", 1.0),
        note=payload.get("note"),
    )
    db.add(item)
    db.commit()
    db.refresh(item)
    return item
