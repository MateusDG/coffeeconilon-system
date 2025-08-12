from pydantic import BaseModel, condecimal, field_validator
from datetime import date
from typing import Optional
from app.models.enums import MovementType, StockUnit

class StockBase(BaseModel):
    product: str        # nome do insumo ou “Café verde”
    movement: MovementType
    quantity: condecimal(ge=0, max_digits=12, decimal_places=3)
    unit: StockUnit           # 'kg', 'sc', 't', 'un'
    date: date

    @field_validator("product")
    @classmethod
    def trim_product(cls, v: str):
        v = " ".join(v.split())
        if not v:
            raise ValueError("product must not be empty")
        return v[:120]

class StockCreate(StockBase):
    crop_id: Optional[int] = None
    lot_id: Optional[int] = None

class StockRead(StockBase):
    id: int
    crop_id: Optional[int]
    lot_id: Optional[int]

    model_config = {
        "from_attributes": True,
    }

class StockUpdate(BaseModel):
    product: Optional[str] = None
    movement: Optional[MovementType] = None
    quantity: Optional[condecimal(ge=0, max_digits=12, decimal_places=3)] = None
    unit: Optional[StockUnit] = None
    date: Optional[date] = None
    lot_id: Optional[int] = None
