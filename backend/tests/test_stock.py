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
from app.models.stock import Stock
from app.services.stock_ops import current_stock_for_product, stock_summary_for_crop


def setup_db():
    engine = create_engine(
        "sqlite:///:memory:", connect_args={"check_same_thread": False}
    )
    TestingSession = sessionmaker(bind=engine)
    Base.metadata.create_all(bind=engine)
    return TestingSession()


def test_stock_helpers():
    db = setup_db()
    today = date.today()
    db.add_all([
        Stock(product="Fert", movement="IN", quantity=Decimal("10"), unit="kg", date=today, crop_id=1, lot_id=1),
        Stock(product="Fert", movement="OUT", quantity=Decimal("3"), unit="kg", date=today, crop_id=1, lot_id=1),
        Stock(product="Fert", movement="IN", quantity=Decimal("4"), unit="kg", date=today, crop_id=2, lot_id=2),
    ])
    db.commit()

    assert current_stock_for_product(db, "Fert") == Decimal("11")
    assert current_stock_for_product(db, "Fert", crop_id=1) == Decimal("7")

    summary = stock_summary_for_crop(db, 1)
    assert summary["Fert"] == Decimal("7")