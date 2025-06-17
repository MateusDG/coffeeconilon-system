# backend/app/schemas/stock.py

from pydantic import BaseModel
from datetime import date
from decimal import Decimal
from typing import Optional

class StockBase(BaseModel):
    product: str        # nome do insumo ou “Café verde”
    movement: str       # 'IN' ou 'OUT'
    quantity: Decimal
    unit: str           # 'kg', 'l', 'saca'
    date: date

class StockCreate(StockBase):
    crop_id: Optional[int]

class StockRead(StockBase):
    id: int
    crop_id: Optional[int]

    class Config:
        orm_mode = True

class StockUpdate(BaseModel):
    product: Optional[str]
    movement: Optional[str]
    quantity: Optional[Decimal]
    unit: Optional[str]
    date: Optional[date]
