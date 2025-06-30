from sqlalchemy import Column, Integer, String, Numeric, Date, ForeignKey, Enum
from sqlalchemy.orm import relationship
from app.core.database import Base
from .mixins import TimestampMixin
from .enums import FinancialType

class Financial(TimestampMixin, Base):
    __tablename__ = "financial_records"

    id          = Column(Integer, primary_key=True, index=True)
    crop_id     = Column(Integer, ForeignKey("crops.id"), nullable=True, index=True)
    lot_id      = Column(Integer, ForeignKey("lots.id"), nullable=True, index=True)
    type        = Column(Enum(FinancialType, name="financial_type", create_constraint=False), nullable=False)
    category    = Column(String(50))              # insumo, mão-de-obra…
    description = Column(String(255))
    value       = Column(Numeric(14, 2), nullable=False)
    date        = Column(Date, nullable=False)

    crop = relationship("Crop", back_populates="financial_records")
    lot  = relationship("Lot", back_populates="financial_records")