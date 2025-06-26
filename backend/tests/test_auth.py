from pathlib import Path
import sys
import os

os.environ.setdefault("SECRET_KEY", "test")
sys.path.append(str(Path(__file__).resolve().parents[1]))

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from app.core.database import Base
from app.api.v1.endpoints.auth import register, login, LoginRequest
from app.schemas.user import UserCreate


def setup_db():
    engine = create_engine(
        "sqlite:///:memory:", connect_args={"check_same_thread": False}
    )
    TestingSession = sessionmaker(bind=engine)
    Base.metadata.create_all(bind=engine)
    return TestingSession()


def test_register_and_login():
    db = setup_db()
    token = register(UserCreate(name="A", email="a@example.com", password="pwd"), db)
    assert token["access_token"]
    result = login(LoginRequest(username="a@example.com", password="pwd"), db)
    assert result["access_token"]