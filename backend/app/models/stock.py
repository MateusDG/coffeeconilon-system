from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base
from .mixins import TimestampMixin
from .enums import MovementType


class Stock(TimestampMixin, Base):
    __tablename__ = "stocks"

    id          = Column(Integer, primary_key=True, index=True)
    crop_id     = Column(Integer, ForeignKey("crops.id"), nullable=True, index=True)
    lot_id      = Column(Integer, ForeignKey("lots.id"), nullable=True, index=True)  # Referência ao lote
    product     = Column(String(120))           # Fertilizante ou “Café verde”
    movement    = Column(Enum(MovementType, name="movement_type", create_constraint=False), nullable=False)
    quantity    = Column(Numeric(14, 3))        # kg ou sacas
    unit        = Column(String(10))            # kg, l, saca
    date        = Column(Date, nullable=False)

    crop = relationship("Crop", back_populates="stocks")
    lot  = relationship("Lot", back_populates="stocks")