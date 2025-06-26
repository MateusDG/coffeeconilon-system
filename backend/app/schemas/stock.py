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
    crop_id: Optional[int]
    lot_id: Optional[int]

class StockRead(StockBase):
    id: int
    crop_id: Optional[int]
    lot_id: Optional[int]

    class Config:
        orm_mode = True

class StockUpdate(BaseModel):
    product: Optional[str]
    movement: Optional[MovementType]
    quantity: Optional[Decimal]
    unit: Optional[str]
    date: Optional[date]
    lot_id: Optional[int]