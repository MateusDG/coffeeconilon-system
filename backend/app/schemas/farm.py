from pydantic import BaseModel
from typing import Optional


class FarmBase(BaseModel):
    name: str
    location: Optional[str]
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class FarmCreate(FarmBase):
    owner_id: int


class FarmRead(FarmBase):
    id: int
    owner_id: int

    class Config:
        orm_mode = True


class FarmUpdate(BaseModel):
    name: Optional[str]
    location: Optional[str]
    latitude: Optional[float]
    longitude: Optional[float]