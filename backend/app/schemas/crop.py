# backend/app/schemas/crop.py

<<<<<<< HEAD
from pydantic import BaseModel, field_validator, field_serializer
from datetime import date, datetime
=======
<<<<<<< HEAD
from pydantic import BaseModel, field_validator, field_serializer
from datetime import date, datetime
=======
from pydantic import BaseModel, field_validator
from datetime import date
>>>>>>> ba42668069ff50cd05bba0251d51dbceb6f042f4
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
from typing import Optional

class CropBase(BaseModel):
    planted_date: date
    harvested_date: Optional[date]

    @field_validator('planted_date', 'harvested_date', mode='before')
    @classmethod
    def parse_dates_ddmmyyyy(cls, v):
        if v is None:
            return v
        if isinstance(v, str):
            s = v.strip()
            for fmt in ("%d/%m/%Y", "%Y-%m-%d"):
                try:
                    return datetime.strptime(s, fmt).date()
                except Exception:
                    continue
            raise ValueError('invalid date format; expected DD/MM/YYYY')
        return v
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

    @field_serializer('planted_date')
    def serialize_planted(self, v: date):
        return v.strftime('%d/%m/%Y')

    @field_serializer('harvested_date')
    def serialize_harvested(self, v: Optional[date]):
        return v.strftime('%d/%m/%Y') if v else None

class CropUpdate(BaseModel):
    planted_date: Optional[date]
    harvested_date: Optional[date]
    yield_bags: Optional[float]
<<<<<<< HEAD

    @field_validator('planted_date', 'harvested_date', mode='before')
    @classmethod
    def parse_dates_ddmmyyyy(cls, v):
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
            raise ValueError('invalid date format; expected DD/MM/YYYY')
        return v
<<<<<<< HEAD
=======
=======
>>>>>>> ba42668069ff50cd05bba0251d51dbceb6f042f4
>>>>>>> 6458800b61a86440f725aff4cb0266f369b61b5b
