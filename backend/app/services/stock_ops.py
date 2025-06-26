from sqlalchemy.orm import Session
from decimal import Decimal
from typing import Optional, Dict

from app.models.stock import Stock


def current_stock_for_product(
    db: Session,
    product: str,
    *,
    crop_id: Optional[int] = None,
    lot_id: Optional[int] = None,
) -> Decimal:
    """Return current stock level for a product optionally filtered by crop or lot."""
    query = db.query(Stock).filter(Stock.product == product)
    if crop_id is not None:
        query = query.filter(Stock.crop_id == crop_id)
    if lot_id is not None:
        query = query.filter(Stock.lot_id == lot_id)

    total = Decimal("0")
    for movement in query.all():
        qty = Decimal(movement.quantity or 0)
        if movement.movement == "IN":
            total += qty
        else:
            total -= qty
    return total


def stock_summary_for_crop(db: Session, crop_id: int) -> Dict[str, Decimal]:
    """Return stock balances for each product in a crop."""
    query = db.query(Stock).filter(Stock.crop_id == crop_id)
    summary: Dict[str, Decimal] = {}
    for mov in query.all():
        qty = Decimal(mov.quantity or 0)
        summary.setdefault(mov.product, Decimal("0"))
        if mov.movement == "IN":
            summary[mov.product] += qty
        else:
            summary[mov.product] -= qty
    return summary