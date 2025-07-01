from sqlalchemy.orm import Session
from typing import Optional, List
from datetime import datetime

from app.models.farm import Farm
from app.schemas.farm import FarmCreate, FarmUpdate


def get_farm(db: Session, farm_id: int) -> Optional[Farm]:
    return db.query(Farm).filter(Farm.id == farm_id).first()


def get_farms(db: Session, skip: int = 0, limit: int = 100) -> List[Farm]:
    return db.query(Farm).offset(skip).limit(limit).all()


def create_farm(db: Session, farm_in: FarmCreate) -> Farm:
    now = datetime.utcnow()
    farm = Farm(
        name=farm_in.name,
        location=farm_in.location,
        latitude=farm_in.latitude,
        longitude=farm_in.longitude,
        owner_id=farm_in.owner_id,
        created_at=now,
        updated_at=now,
    )
    db.add(farm)
    db.commit()
    db.refresh(farm)
    return farm


def update_farm(db: Session, db_farm: Farm, farm_in: FarmUpdate) -> Farm:
    if farm_in.name is not None:
        db_farm.name = farm_in.name
    if farm_in.location is not None:
        db_farm.location = farm_in.location
    if farm_in.latitude is not None:
        db_farm.latitude = farm_in.latitude
    if farm_in.longitude is not None:
        db_farm.longitude = farm_in.longitude
    db_farm.updated_at = datetime.utcnow()
    db.commit()
    db.refresh(db_farm)
    return db_farm


def delete_farm(db: Session, db_farm: Farm) -> None:
    db.delete(db_farm)
    db.commit()