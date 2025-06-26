from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Stock(Base):
    __tablename__ = "stocks"

    id          = Column(Integer, primary_key=True, index=True)
    crop_id     = Column(Integer, ForeignKey("crops.id"), nullable=True)
    lot_id      = Column(Integer, ForeignKey("lots.id"), nullable=True)  # Referência ao lote
    product     = Column(String(120))           # Fertilizante ou “Café verde”
    movement    = Column(String(6))             # IN / OUT
    quantity    = Column(Numeric(14, 3))        # kg ou sacas
    unit        = Column(String(10))            # kg, l, saca
    date        = Column(Date, nullable=False)

    crop = relationship("Crop", back_populates="stocks")
