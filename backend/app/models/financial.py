from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Financial(Base):
    __tablename__ = "financial_records"

    id          = Column(Integer, primary_key=True, index=True)
    crop_id     = Column(Integer, ForeignKey("crops.id"), nullable=True)
    lot_id      = Column(Integer, ForeignKey("lots.id"), nullable=True)
    type        = Column(String(10))              # IN / OUT
    category    = Column(String(50))              # insumo, mão-de-obra…
    description = Column(String(255))
    value       = Column(Numeric(14, 2), nullable=False)
    date        = Column(Date, nullable=False)

    crop = relationship("Crop", back_populates="financial_records")
