from pydantic import BaseModel, ConfigDict
from uuid import UUID


class UserSourcePreferenceUpsert(BaseModel):
    enabled: bool = True
    weight_level: str = 'default'


class UserSourcePreferenceRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)
    id: UUID
    user_id: UUID
    source_id: UUID
    enabled: bool
    weight_level: str
