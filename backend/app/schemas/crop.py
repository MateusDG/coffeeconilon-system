# backend/app/schemas/crop.py

from pydantic import BaseModel
from datetime import date
from typing import Optional

class CropBase(BaseModel):
    planted_date: date
    harvested_date: Optional[date]
    yield_bags: Optional[float]

class CropCreate(CropBase):
    lot_id: int

class CropRead(CropBase):
    id: int
    lot_id: int

    class Config:
        orm_mode = True

class CropUpdate(BaseModel):
    planted_date: Optional[date]
    harvested_date: Optional[date]
    yield_bags: Optional[float]
