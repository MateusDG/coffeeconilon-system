<<<<<<< HEAD
from pydantic import BaseModel, condecimal, field_validator, field_serializer
from datetime import date, datetime
=======
from pydantic import BaseModel, condecimal, field_validator
from datetime import date
>>>>>>> ba42668069ff50cd05bba0251d51dbceb6f042f4
from typing import Optional
from app.models.enums import MovementType, StockUnit

class StockBase(BaseModel):
    product: str        # nome do insumo ou “Café verde”
    movement: MovementType
    quantity: condecimal(ge=0, max_digits=12, decimal_places=3)
    unit: StockUnit           # 'kg', 'sc', 't', 'un'
    date: date

<<<<<<< HEAD
    @field_validator("date", mode="before")
    @classmethod
    def parse_date_ddmmyyyy(cls, v):
        if isinstance(v, str):
            s = v.strip()
            for fmt in ("%d/%m/%Y", "%Y-%m-%d"):
                try:
                    return datetime.strptime(s, fmt).date()
                except Exception:
                    continue
            raise ValueError("invalid date format; expected DD/MM/YYYY")
        return v

=======
>>>>>>> ba42668069ff50cd05bba0251d51dbceb6f042f4
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

    @field_serializer("date")
    def serialize_date(self, v: date):
        return v.strftime("%d/%m/%Y")

class StockUpdate(BaseModel):
    product: Optional[str] = None
    movement: Optional[MovementType] = None
    quantity: Optional[condecimal(ge=0, max_digits=12, decimal_places=3)] = None
    unit: Optional[StockUnit] = None
    date: Optional[date] = None
    lot_id: Optional[int] = None
<<<<<<< HEAD

    @field_validator("date", mode="before")
    @classmethod
    def parse_date_ddmmyyyy(cls, v):
        if v is None:
            return v
        if isinstance(v, str):
            s = v.strip()
            from datetime import datetime
            for fmt in ("%d/%m/%Y", "%Y-%m-%d"):
                try:
                    return datetime.strptime(s, fmt).date()
                except Exception:
                    continue
            raise ValueError("invalid date format; expected DD/MM/YYYY")
        return v
=======
>>>>>>> ba42668069ff50cd05bba0251d51dbceb6f042f4
