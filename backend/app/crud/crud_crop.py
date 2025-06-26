from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime

from app.models.crop import Crop
from app.schemas.crop import CropCreate, CropUpdate


def get_crop(db: Session, crop_id: int) -> Optional[Crop]:
    return db.query(Crop).filter(Crop.id == crop_id).first()


def get_crops(db: Session, skip: int = 0, limit: int = 100) -> List[Crop]:
    return db.query(Crop).offset(skip).limit(limit).all()


def create_crop(db: Session, crop_in: CropCreate) -> Crop:
    now = datetime.utcnow()
    crop = Crop(
        lot_id=crop_in.lot_id,
        planted_date=crop_in.planted_date,
        harvested_date=crop_in.harvested_date,
        yield_bags=crop_in.yield_bags,
        created_at=now,
        updated_at=now,
    )
    db.add(crop)
    db.commit()
    db.refresh(crop)
    return crop


def update_crop(db: Session, db_crop: Crop, crop_in: CropUpdate) -> Crop:
    if crop_in.planted_date is not None:
        db_crop.planted_date = crop_in.planted_date
    if crop_in.harvested_date is not None:
        db_crop.harvested_date = crop_in.harvested_date
    if crop_in.yield_bags is not None:
        db_crop.yield_bags = crop_in.yield_bags
    db_crop.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_crop)
    return db_crop


def delete_crop(db: Session, db_crop: Crop) -> None:
    db.delete(db_crop)
    db.commit()