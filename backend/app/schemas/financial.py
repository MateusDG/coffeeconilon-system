from pydantic import BaseModel, field_validator, condecimal
from datetime import date
from decimal import Decimal
from typing import Optional
from app.models.enums import FinancialType, FinancialCategory


class FinancialBase(BaseModel):
    type: FinancialType
    category: FinancialCategory
    description: Optional[str] = None
    value: condecimal(gt=0, max_digits=14, decimal_places=2)
    date: date

    @field_validator("description")
    @classmethod
    def trim_description(cls, v: Optional[str]):
        if v is None:
            return v
        v = " ".join(v.split())
        return v[:255]

class FinancialCreate(FinancialBase):
    crop_id: Optional[int] = None
    lot_id: Optional[int] = None

class FinancialRead(FinancialBase):
    id: int
    crop_id: Optional[int]
    lot_id: Optional[int]

    model_config = {
        "from_attributes": True,
    }

class FinancialUpdate(BaseModel):
    type: Optional[FinancialType] = None
    category: Optional[FinancialCategory] = None
    description: Optional[str] = None
    value: Optional[condecimal(gt=0, max_digits=14, decimal_places=2)] = None
    date: Optional[date] = None
