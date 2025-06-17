# backend/app/schemas/report.py

from pydantic import BaseModel
from datetime import date
from typing import List, Optional
from decimal import Decimal

class ReportFilter(BaseModel):
    start_date: Optional[date]
    end_date: Optional[date]
    lot_id: Optional[int]
    crop_id: Optional[int]

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

    class Config:
        orm_mode = True

