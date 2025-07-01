from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from .mixins import TimestampMixin


class Farm(TimestampMixin, Base):
    __tablename__ = "farms"

    id        = Column(Integer, primary_key=True, index=True)
    name      = Column(String(120), nullable=False)
    location  = Column(String(120))
    latitude  = Column(Float)
    longitude = Column(Float)
    owner_id  = Column(Integer, ForeignKey("users.id"), nullable=False)

    owner = relationship("User", back_populates="farms")
    lots  = relationship("Lot", back_populates="farm", cascade="all, delete")