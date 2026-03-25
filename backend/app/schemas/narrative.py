from pydantic import BaseModel, ConfigDict
from uuid import UUID


class NarrativeBase(BaseModel):
    title: str
    slug: str
    one_line_summary: str | None = None
    description: str | None = None
    state: str = "emerging"
    domain: str = "crypto"
    is_public: bool = True


class NarrativeCreate(NarrativeBase):
    pass


class NarrativeUpdate(BaseModel):
    title: str | None = None
    one_line_summary: str | None = None
    description: str | None = None
    state: str | None = None
    is_public: bool | None = None


class NarrativeRead(NarrativeBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    attention_score: float
    conviction_score: float
    attention_share: float
    conviction_share: float
    confidence_score: float
