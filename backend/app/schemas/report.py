# backend/app/schemas/report.py

from pydantic import BaseModel, field_validator
from datetime import date, datetime
from typing import List, Optional
from decimal import Decimal

class ReportFilter(BaseModel):
    start_date: Optional[date]
    end_date: Optional[date]
    lot_id: Optional[int]
    crop_id: Optional[int]

    @field_validator('start_date', 'end_date', mode='before')
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

class FinancialSummary(BaseModel):
    total_in: Decimal
    total_out: Decimal
    net: Decimal

class StockSummary(BaseModel):
    product: str
    quantity: Decimal
    unit: str

class ReportResponse(BaseModel):
    financial_summary: FinancialSummary
    stock_summary: List[StockSummary]

    model_config = {
        "from_attributes": True,
    }
