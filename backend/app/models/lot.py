from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from .mixins import TimestampMixin

class Lot(TimestampMixin, Base):
    __tablename__ = "lotes"

    id = Column(Integer, primary_key=True, index=True)
    nome = Column(String(80), nullable=False)
    area_ha = Column(Float, nullable=False)  # hectares
    farm_id = Column(Integer, ForeignKey("farms.id"), nullable=False)
    crop_year = Column(Integer)  # safra 2025, 2026...

    fazenda = relationship("Farm", back_populates="lotes")
    culturas = relationship("Crop", back_populates="lote", cascade="all, delete")
    financial_records = relationship(
        "Financeiro",
        back_populates="lote",
        cascade="all, delete",
    )
    acoes = relationship(
        "Estoque",
        back_populates="lote",
        cascade="all, delete",
    )
