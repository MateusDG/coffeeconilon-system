from pydantic import BaseModel
from typing import Optional, List

class LotBase(BaseModel):
    name: str
    area_ha: float
    crop_year: Optional[int]
    coordinates: Optional[List[List[float]]] = None

class LotCreate(LotBase):
    farm_id: int

class LotRead(LotBase):
    id: int
    farm_id: int

    class Config:
        orm_mode = True

class LotUpdate(BaseModel):
    name: Optional[str]
    area_ha: Optional[float]
    crop_year: Optional[int]
    coordinates: Optional[List[List[float]]] = None