# backend/app/schemas/financial.py

from pydantic import BaseModel
from datetime import date
from decimal import Decimal
from typing import Optional

class FinancialBase(BaseModel):
    type: str           # 'IN' ou 'OUT'
    category: str
    description: Optional[str]
    value: Decimal
    date: date

class FinancialCreate(FinancialBase):
    crop_id: Optional[int]
    lot_id: Optional[int]

class FinancialRead(FinancialBase):
    id: int
    crop_id: Optional[int]
    lot_id: Optional[int]

    class Config:
        orm_mode = True

class FinancialUpdate(BaseModel):
    type: Optional[str]
    category: Optional[str]
    description: Optional[str]
    value: Optional[Decimal]
    date: Optional[date]

