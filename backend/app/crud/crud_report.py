from sqlalchemy import func
from sqlalchemy.orm import Session
from decimal import Decimal
from typing import List

from app.models.financial import Financial
from app.models.stock import Stock
from app.models.lot import Lot
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
    if filters.farm_id:
        fin_query = fin_query.join(Lot, Financial.lot_id == Lot.id, isouter=True).filter(Lot.farm_id == filters.farm_id)

    # Use plain string comparisons for broader DB compatibility (SQLite/Postgres)
    total_in_raw = (
        fin_query.filter(Financial.type == "IN")
        .with_entities(func.sum(Financial.value))
        .scalar()
    )
    total_out_raw = (
        fin_query.filter(Financial.type == "OUT")
        .with_entities(func.sum(Financial.value))
        .scalar()
    )

    stock_query = db.query(Stock.product, func.sum(Stock.quantity).label("qty"), Stock.unit)
    if filters.start_date:
        stock_query = stock_query.filter(Stock.date >= filters.start_date)
    if filters.end_date:
        stock_query = stock_query.filter(Stock.date <= filters.end_date)
    if filters.crop_id:
        stock_query = stock_query.filter(Stock.crop_id == filters.crop_id)
    if filters.farm_id:
        stock_query = stock_query.join(Lot, Stock.lot_id == Lot.id, isouter=True).filter(Lot.farm_id == filters.farm_id)
    stock_query = stock_query.group_by(Stock.product, Stock.unit)

    stock_summary: List[StockSummary] = []
    for prod, qty, unit in stock_query.all():
        # Coalesce values to avoid nulls in response
        q = Decimal(str(qty)) if qty is not None else Decimal("0")
        stock_summary.append(StockSummary(product=prod or "", quantity=q, unit=unit or ""))

    # Normalize to Decimal safely regardless of DB return type (None/int/str/Decimal)
    to_dec = lambda x: Decimal(str(x)) if x is not None else Decimal("0")
    total_in = to_dec(total_in_raw)
    total_out = to_dec(total_out_raw)
<<<<<<< HEAD
=======

    # Normalize to Decimal safely regardless of DB return type (None/int/str/Decimal)
    to_dec = lambda x: Decimal(str(x)) if x is not None else Decimal("0")
    total_in = to_dec(total_in_raw)
    total_out = to_dec(total_out_raw)
>>>>>>> f7c069de203884441268ff5818b449f8c362840e

    financial_summary = FinancialSummary(
        total_in=total_in,
        total_out=total_out,
        net=total_in - total_out,
    )
    return ReportResponse(financial_summary=financial_summary, stock_summary=stock_summary)
