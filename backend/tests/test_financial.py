from datetime import date
from decimal import Decimal
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sys
from pathlib import Path
import os

os.environ.setdefault("SECRET_KEY", "test")
sys.path.append(str(Path(__file__).resolve().parents[1]))

from app.core.database import Base
from app.models.financial import Financial
from app.services.financial_calcs import (
    calculate_profit_for_crop,
    calculate_profit_for_lot,
)


def setup_db():
    engine = create_engine(
        "sqlite:///:memory:", connect_args={"check_same_thread": False}
    )
    TestingSession = sessionmaker(bind=engine)
    Base.metadata.create_all(bind=engine)
    return TestingSession()


def test_profit_helpers():
    db = setup_db()
    today = date.today()
    # create sample financial movements
    db.add_all([
        Financial(crop_id=1, lot_id=1, type="IN", category="sale", description="", value=Decimal("1000"), date=today),
        Financial(crop_id=1, lot_id=1, type="OUT", category="cost", description="", value=Decimal("200"), date=today),
        Financial(crop_id=2, lot_id=2, type="IN", category="sale", description="", value=Decimal("500"), date=today),
    ])
    db.commit()

    assert calculate_profit_for_crop(db, 1) == Decimal("800")
    assert calculate_profit_for_lot(db, 1) == Decimal("800")