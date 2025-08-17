<<<<<<< HEAD
from pydantic import BaseModel, field_validator, field_serializer, condecimal
from datetime import date, datetime
=======
<<<<<<< HEAD
from pydantic import BaseModel, field_validator, field_serializer, condecimal
from datetime import date, datetime
=======
from pydantic import BaseModel, field_validator, condecimal
from datetime import date
>>>>>>> ba42668069ff50cd05bba0251d51dbceb6f042f4
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
from decimal import Decimal
from typing import Optional
from app.models.enums import FinancialType, FinancialCategory


class FinancialBase(BaseModel):
    type: FinancialType
    category: FinancialCategory
    description: Optional[str] = None
    value: condecimal(gt=0, max_digits=14, decimal_places=2)
    date: date

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
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

<<<<<<< HEAD
=======
=======
>>>>>>> ba42668069ff50cd05bba0251d51dbceb6f042f4
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
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

    @field_serializer("date")
    def serialize_date(self, v: date):
        return v.strftime("%d/%m/%Y")

class FinancialUpdate(BaseModel):
    type: Optional[FinancialType] = None
    category: Optional[FinancialCategory] = None
    description: Optional[str] = None
    value: Optional[condecimal(gt=0, max_digits=14, decimal_places=2)] = None
    date: Optional[date] = None
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
    crop_id: Optional[int] = None
    lot_id: Optional[int] = None

    class Config:
        extra = 'ignore'

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
<<<<<<< HEAD
=======
=======
>>>>>>> ba42668069ff50cd05bba0251d51dbceb6f042f4
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
