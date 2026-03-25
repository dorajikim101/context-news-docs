from pydantic import BaseModel, ConfigDict
from uuid import UUID


class SourceBase(BaseModel):
    name: str
    slug: str
    source_type: str
    source_status: str = "candidate"
    base_weight: float = 1.0
    description: str | None = None
    homepage_url: str | None = None
    active: bool = True


class SourceCreate(SourceBase):
    pass


class SourceUpdate(BaseModel):
    name: str | None = None
    source_type: str | None = None
    source_status: str | None = None
    base_weight: float | None = None
    description: str | None = None
    homepage_url: str | None = None
    active: bool | None = None


class SourceRead(SourceBase):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
