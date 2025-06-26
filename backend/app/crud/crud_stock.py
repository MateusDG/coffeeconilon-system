from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime

from app.models.stock import Stock
from app.schemas.stock import StockCreate, StockUpdate


def get_movement(db: Session, movement_id: int) -> Optional[Stock]:
    return db.query(Stock).filter(Stock.id == movement_id).first()


def get_movements(db: Session, skip: int = 0, limit: int = 100) -> List[Stock]:
    return db.query(Stock).offset(skip).limit(limit).all()


def create_movement(db: Session, stock_in: StockCreate) -> Stock:
    now = datetime.utcnow()
    movement = Stock(
        crop_id=stock_in.crop_id,
        lot_id=stock_in.lot_id,
        product=stock_in.product,
        movement=stock_in.movement,
        quantity=stock_in.quantity,
        unit=stock_in.unit,
        date=stock_in.date,
        created_at=now,
        updated_at=now,
    )
    db.add(movement)
    db.commit()
    db.refresh(movement)
    return movement


def update_movement(db: Session, db_movement: Stock, stock_in: StockUpdate) -> Stock:
    if stock_in.product is not None:
        db_movement.product = stock_in.product
    if stock_in.movement is not None:
        db_movement.movement = stock_in.movement
    if stock_in.quantity is not None:
        db_movement.quantity = stock_in.quantity
    if stock_in.unit is not None:
        db_movement.unit = stock_in.unit
    if stock_in.date is not None:
        db_movement.date = stock_in.date
    if stock_in.lot_id is not None:
        db_movement.lot_id = stock_in.lot_id
    db_movement.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_movement)
    return db_movement


def update_movement(db: Session, db_movement: Stock, stock_in: StockUpdate) -> Stock:
    if stock_in.product is not None:
        db_movement.product = stock_in.product
    if stock_in.movement is not None:
        db_movement.movement = stock_in.movement
    if stock_in.quantity is not None:
        db_movement.quantity = stock_in.quantity
    if stock_in.unit is not None:
        db_movement.unit = stock_in.unit
    if stock_in.date is not None:
        db_movement.date = stock_in.date
    db_movement.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_movement)
    return db_movement


def delete_movement(db: Session, db_movement: Stock) -> None:
    db.delete(db_movement)
    db.commit()