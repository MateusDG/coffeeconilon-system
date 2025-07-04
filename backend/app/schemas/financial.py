from pydantic import BaseModel
from datetime import date
from decimal import Decimal
from typing import Optional
from app.models.enums import FinancialType


class FinancialBase(BaseModel):
    type: FinancialType
    category: str
    description: Optional[str] = None
    value: Decimal
    date: date

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
    category: Optional[str] = None
    description: Optional[str] = None
    value: Optional[Decimal] = None
    date: Optional[date] = None