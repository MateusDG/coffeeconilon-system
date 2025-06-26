from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime

from app.models.financial import Financial
from app.schemas.financial import FinancialCreate, FinancialUpdate


def get_record(db: Session, record_id: int) -> Optional[Financial]:
    return db.query(Financial).filter(Financial.id == record_id).first()


def get_records(db: Session, skip: int = 0, limit: int = 100) -> List[Financial]:
    return db.query(Financial).offset(skip).limit(limit).all()


def create_record(db: Session, record_in: FinancialCreate) -> Financial:
    now = datetime.utcnow()
    record = Financial(
        crop_id=record_in.crop_id,
        lot_id=record_in.lot_id,
        type=record_in.type,
        category=record_in.category,
        description=record_in.description,
        value=record_in.value,
        date=record_in.date,
        created_at=now,
        updated_at=now,
    )
    db.add(record)
    db.commit()
    db.refresh(record)
    return record


def update_record(db: Session, db_record: Financial, record_in: FinancialUpdate) -> Financial:
    if record_in.type is not None:
        db_record.type = record_in.type
    if record_in.category is not None:
        db_record.category = record_in.category
    if record_in.description is not None:
        db_record.description = record_in.description
    if record_in.value is not None:
        db_record.value = record_in.value
    if record_in.date is not None:
        db_record.date = record_in.date
    db_record.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_record)
    return db_record


def delete_record(db: Session, db_record: Financial) -> None:
    db.delete(db_record)
    db.commit()