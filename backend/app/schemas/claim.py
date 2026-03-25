from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime


class ClaimBase(BaseModel):
    narrative_id: UUID
    actor_id: UUID | None = None
    source_id: UUID | None = None
    claim_text: str
    claim_type: str
    stance: str | None = None
    claim_date: datetime | None = None
    confidence: float = 0.5


class ClaimCreate(ClaimBase):
    pass


class ClaimUpdate(BaseModel):
    actor_id: UUID | None = None
    source_id: UUID | None = None
    claim_text: str | None = None
    claim_type: str | None = None
    stance: str | None = None
    claim_date: datetime | None = None
    confidence: float | None = None


class ClaimRead(ClaimBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
