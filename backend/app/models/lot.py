from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from .mixins import TimestampMixin

class Lot(TimestampMixin, Base):
    __tablename__ = "lots"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(80), nullable=False)
    area_ha = Column(Float, nullable=False)  # hectares
    farm_id = Column(Integer, ForeignKey("farms.id"), nullable=False)
    crop_year = Column(Integer)

    farm = relationship("Farm", back_populates="lots")
    crops = relationship("Crop", back_populates="lot", cascade="all, delete")
    financial_records = relationship(
        "Financial",
        back_populates="lot",
        cascade="all, delete",
    )
    stocks = relationship(
        "Stock",
        back_populates="lot",
        cascade="all, delete",
    )