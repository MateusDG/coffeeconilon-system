from datetime import date
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pathlib import Path
import sys
import os

os.environ.setdefault("SECRET_KEY", "test")
sys.path.append(str(Path(__file__).resolve().parents[1]))

from fastapi import HTTPException
from app.core.database import Base
from app.crud.crud_lot import create_lot
from app.crud.crud_crop import create_crop
from app.schemas.lot import LotCreate
from app.schemas.crop import CropCreate


def setup_db():
    engine = create_engine(
        "sqlite:///:memory:", connect_args={"check_same_thread": False}
    )
    TestingSession = sessionmaker(bind=engine)
    Base.metadata.create_all(bind=engine)
    return TestingSession()


def test_create_lot_missing_farm():
    db = setup_db()
    lot_in = LotCreate(name="A", area_ha=1.0, crop_year=2025, farm_id=1)
    try:
        create_lot(db, lot_in)
        assert False, "Should have raised HTTPException"
    except HTTPException as exc:
        assert exc.status_code == 404


def test_create_crop_missing_lot():
    db = setup_db()
    crop_in = CropCreate(
        lot_id=1,
        planted_date=date.today(),
        harvested_date=None,
        yield_bags=10.0,
    )
    try:
        create_crop(db, crop_in)
        assert False, "Should have raised HTTPException"
    except HTTPException as exc:
        assert exc.status_code == 404