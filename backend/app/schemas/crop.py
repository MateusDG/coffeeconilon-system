# backend/app/schemas/crop.py

from pydantic import BaseModel, field_validator
from datetime import date
from typing import Optional

class CropBase(BaseModel):
    planted_date: date
    harvested_date: Optional[date]
    yield_bags: Optional[float]

    @field_validator('harvested_date')
    @classmethod
    def validate_dates(cls, harvested, info):
        planted = info.data.get('planted_date')
        if harvested and planted and harvested < planted:
            raise ValueError('harvested_date must be after planted_date')
        return harvested

class CropCreate(CropBase):
    lot_id: int

class CropRead(CropBase):
    id: int
    lot_id: int

    model_config = {
        "from_attributes": True,
    }

class CropUpdate(BaseModel):
    planted_date: Optional[date]
    harvested_date: Optional[date]
    yield_bags: Optional[float]
