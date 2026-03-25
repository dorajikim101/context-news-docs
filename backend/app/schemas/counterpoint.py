from pydantic import BaseModel, ConfigDict
from uuid import UUID


class CounterpointBase(BaseModel):
    narrative_id: UUID | None = None
    claim_id: UUID | None = None
    actor_id: UUID | None = None
    source_id: UUID | None = None
    counterpoint_text: str
    counterpoint_type: str
    strength: float = 0.5


class CounterpointCreate(CounterpointBase):
    pass


class CounterpointUpdate(BaseModel):
    narrative_id: UUID | None = None
    claim_id: UUID | None = None
    actor_id: UUID | None = None
    source_id: UUID | None = None
    counterpoint_text: str | None = None
    counterpoint_type: str | None = None
    strength: float | None = None


class CounterpointRead(CounterpointBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
