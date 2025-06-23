from sqlalchemy import func
from sqlalchemy.orm import Session
from typing import List
from decimal import Decimal
from io import StringIO
import csv

from app.models.financial import Financial
from app.models.stock import Stock
from app.schemas.report import (
    ReportFilter,
    ReportResponse,
    FinancialSummary,
    StockSummary,
)


def _apply_financial_filters(query, filters: ReportFilter):
    if filters.start_date:
        query = query.filter(Financial.date >= filters.start_date)
    if filters.end_date:
        query = query.filter(Financial.date <= filters.end_date)
    if filters.lot_id:
        query = query.filter(Financial.lot_id == filters.lot_id)
    if filters.crop_id:
        query = query.filter(Financial.crop_id == filters.crop_id)
    return query


def _apply_stock_filters(query, filters: ReportFilter):
    if filters.start_date:
        query = query.filter(Stock.date >= filters.start_date)
    if filters.end_date:
        query = query.filter(Stock.date <= filters.end_date)
    if filters.crop_id:
        query = query.filter(Stock.crop_id == filters.crop_id)
    return query


def calculate_financial_summary(db: Session, filters: ReportFilter) -> FinancialSummary:
    base_query = _apply_financial_filters(db.query(Financial), filters)

    total_in = (
        base_query.filter(Financial.type == "IN")
        .with_entities(func.sum(Financial.value))
        .scalar()
        or 0
    )
    total_out = (
        base_query.filter(Financial.type == "OUT")
        .with_entities(func.sum(Financial.value))
        .scalar()
        or 0
    )

    return FinancialSummary(
        total_in=Decimal(total_in),
        total_out=Decimal(total_out),
        net=Decimal(total_in) - Decimal(total_out),
    )


def calculate_stock_summary(db: Session, filters: ReportFilter) -> List[StockSummary]:
    query = _apply_stock_filters(
        db.query(Stock.product, func.sum(Stock.quantity).label("qty"), Stock.unit),
        filters,
    )
    query = query.group_by(Stock.product, Stock.unit)

    return [
        StockSummary(product=p, quantity=Decimal(q or 0), unit=u)
        for p, q, u in query.all()
    ]


def generate_report(db: Session, filters: ReportFilter) -> ReportResponse:
    financial_summary = calculate_financial_summary(db, filters)
    stock_summary = calculate_stock_summary(db, filters)
    return ReportResponse(
        financial_summary=financial_summary,
        stock_summary=stock_summary,
    )


def report_to_csv(report: ReportResponse) -> str:
    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(["metric", "value"])
    fs = report.financial_summary
    writer.writerow(["total_in", fs.total_in])
    writer.writerow(["total_out", fs.total_out])
    writer.writerow(["net", fs.net])
    writer.writerow([])
    writer.writerow(["product", "quantity", "unit"])
    for item in report.stock_summary:
        writer.writerow([item.product, item.quantity, item.unit])
    return output.getvalue()