from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from app.core.database import Base
from .mixins import TimestampMixin

class User(TimestampMixin, Base):
    __tablename__ = "users"

    id          = Column(Integer, primary_key=True, index=True)
    name        = Column(String(100), nullable=False)
    email       = Column(String(100), unique=True, index=True, nullable=False)
    password    = Column(String(255), nullable=False)          # hash!
    is_active   = Column(Boolean, default=True)

    farms = relationship("Farm", back_populates="owner")
