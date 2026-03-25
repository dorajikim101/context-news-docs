from pydantic import BaseModel, ConfigDict
from uuid import UUID
from datetime import datetime


class EvidenceBase(BaseModel):
    source_id: UUID | None = None
    title: str | None = None
    url: str | None = None
    evidence_type: str
    excerpt: str | None = None
    published_at: datetime | None = None


class EvidenceCreate(EvidenceBase):
    pass


class EvidenceUpdate(BaseModel):
    source_id: UUID | None = None
    title: str | None = None
    url: str | None = None
    evidence_type: str | None = None
    excerpt: str | None = None
    published_at: datetime | None = None


class EvidenceRead(EvidenceBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
