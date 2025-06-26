from sqlalchemy.orm import Session
from sqlalchemy import func
from decimal import Decimal

from app.models.financial import Financial


def calculate_profit_for_crop(db: Session, crop_id: int) -> Decimal:
    """Return net profit for a given crop."""
    query = db.query(Financial).filter(Financial.crop_id == crop_id)
    total_in = (
        query.filter(Financial.type == "IN")
        .with_entities(func.sum(Financial.value))
        .scalar()
        or 0
    )
    total_out = (
        query.filter(Financial.type == "OUT")
        .with_entities(func.sum(Financial.value))
        .scalar()
        or 0
    )
    return Decimal(total_in) - Decimal(total_out)


def calculate_profit_for_lot(db: Session, lot_id: int) -> Decimal:
    """Return net profit for a given lot."""
    query = db.query(Financial).filter(Financial.lot_id == lot_id)
    total_in = (
        query.filter(Financial.type == "IN")
        .with_entities(func.sum(Financial.value))
        .scalar()
        or 0
    )
    total_out = (
        query.filter(Financial.type == "OUT")
        .with_entities(func.sum(Financial.value))
        .scalar()
        or 0
    )
    return Decimal(total_in) - Decimal(total_out)