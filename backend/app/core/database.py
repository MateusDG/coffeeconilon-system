from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

# Se for SQLite, precisa dessa flag; caso contrário, usa Postgres ou outro DB
if settings.DB_URL.startswith("sqlite"):
    engine = create_engine(
        settings.DB_URL,
        connect_args={"check_same_thread": False},
        echo=settings.DEBUG  # opcional, para ver logs SQL
    )
else:
    engine = create_engine(
        settings.DB_URL,
        echo=settings.DEBUG,
        future=True
    )

SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

Base = declarative_base()
