from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime


class ActionSignalBase(BaseModel):
    narrative_id: UUID | None = None
    actor_id: UUID | None = None
    source_id: UUID | None = None
    signal_type: str
    title: str | None = None
    description: str | None = None
    signal_date: datetime | None = None
    strength: float = 0.5


class ActionSignalCreate(ActionSignalBase):
    pass


class ActionSignalUpdate(BaseModel):
    narrative_id: UUID | None = None
    actor_id: UUID | None = None
    source_id: UUID | None = None
    signal_type: str | None = None
    title: str | None = None
    description: str | None = None
    signal_date: datetime | None = None
    strength: float | None = None


class ActionSignalRead(ActionSignalBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
