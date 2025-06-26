from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime

from fastapi import HTTPException, status
from app.models.lot import Lot
from app.models.farm import Farm
from app.schemas.lot import LotCreate, LotUpdate


def get_lot(db: Session, lot_id: int) -> Optional[Lot]:
    return db.query(Lot).filter(Lot.id == lot_id).first()


def get_lots(db: Session, skip: int = 0, limit: int = 100) -> List[Lot]:
    return db.query(Lot).offset(skip).limit(limit).all()


def create_lot(db: Session, lot_in: LotCreate) -> Lot:
    farm = db.query(Farm).filter(Farm.id == lot_in.farm_id).first()
    if not farm:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Farm not found",
        )

    now = datetime.utcnow()
    lot = Lot(
        name=lot_in.name,
        area_ha=lot_in.area_ha,
        crop_year=lot_in.crop_year,
        farm_id=lot_in.farm_id,
        created_at=now,
        updated_at=now,
    )
    db.add(lot)
    db.commit()
    db.refresh(lot)
    return lot


def update_lot(db: Session, db_lot: Lot, lot_in: LotUpdate) -> Lot:
    if lot_in.name is not None:
        db_lot.name = lot_in.name
    if lot_in.area_ha is not None:
        db_lot.area_ha = lot_in.area_ha
    if lot_in.crop_year is not None:
        db_lot.crop_year = lot_in.crop_year
    db_lot.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_lot)
    return db_lot


def delete_lot(db: Session, db_lot: Lot) -> None:
    db.delete(db_lot)
    db.commit()