# backend/app/schemas/farm.py

from pydantic import BaseModel
from typing import Optional

class FarmBase(BaseModel):
    name: str
    location: Optional[str]

class FarmCreate(FarmBase):
    pass

class FarmRead(FarmBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True

class FarmUpdate(BaseModel):
    name: Optional[str]
    location: Optional[str]
