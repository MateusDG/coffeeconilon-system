from sqlalchemy import func
from sqlalchemy.orm import Session
from decimal import Decimal
from typing import List

from app.models.financial import Financial
from app.models.stock import Stock
from app.models.enums import FinancialType
from app.schemas.report import (
    ReportFilter,
    ReportResponse,
    FinancialSummary,
    StockSummary,
)


def generate_report(db: Session, filters: ReportFilter) -> ReportResponse:
    fin_query = db.query(Financial)
    if filters.start_date:
        fin_query = fin_query.filter(Financial.date >= filters.start_date)
    if filters.end_date:
        fin_query = fin_query.filter(Financial.date <= filters.end_date)
    if filters.lot_id:
        fin_query = fin_query.filter(Financial.lot_id == filters.lot_id)
    if filters.crop_id:
        fin_query = fin_query.filter(Financial.crop_id == filters.crop_id)

    total_in = (
        fin_query.filter(Financial.type == FinancialType.IN)
        .with_entities(func.sum(Financial.value))
        .scalar()
        or 0
    )
    total_out = (
        fin_query.filter(Financial.type == FinancialType.OUT)
        .with_entities(func.sum(Financial.value))
        .scalar()
        or 0
    )

    stock_query = db.query(Stock.product, func.sum(Stock.quantity).label("qty"), Stock.unit)
    if filters.start_date:
        stock_query = stock_query.filter(Stock.date >= filters.start_date)
    if filters.end_date:
        stock_query = stock_query.filter(Stock.date <= filters.end_date)
    if filters.crop_id:
        stock_query = stock_query.filter(Stock.crop_id == filters.crop_id)
    stock_query = stock_query.group_by(Stock.product, Stock.unit)

    stock_summary: List[StockSummary] = [
        StockSummary(product=prod, quantity=qty or 0, unit=unit)
        for prod, qty, unit in stock_query.all()
    ]

    financial_summary = FinancialSummary(
        total_in=Decimal(total_in),
        total_out=Decimal(total_out),
        net=Decimal(total_in) - Decimal(total_out),
    )
    return ReportResponse(financial_summary=financial_summary, stock_summary=stock_summary)
