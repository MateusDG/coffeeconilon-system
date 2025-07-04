from pydantic import BaseModel
from datetime import date
from decimal import Decimal
from typing import Optional
from app.models.enums import MovementType

class StockBase(BaseModel):
    product: str        # nome do insumo ou “Café verde”
    movement: MovementType
    quantity: Decimal
    unit: str           # 'kg', 'l', 'saca'
    date: date

class StockCreate(StockBase):
    crop_id: Optional[int] = None
    lot_id: Optional[int] = None

class StockRead(StockBase):
    id: int
    crop_id: Optional[int]
    lot_id: Optional[int]

    class Config:
        orm_mode = True

class StockUpdate(BaseModel):
    product: Optional[str] = None
    movement: Optional[MovementType] = None
    quantity: Optional[Decimal] = None
    unit: Optional[str] = None
    date: Optional[date] = None
    lot_id: Optional[int] = None