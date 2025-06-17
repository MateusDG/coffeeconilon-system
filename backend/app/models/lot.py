from sqlalchemy import Column, Integer, String, Float, ForeignKey, Date
from sqlalchemy.orm import relationship
from app.core.database import Base

class Lot(Base):
    __tablename__ = "lots"

    id        = Column(Integer, primary_key=True, index=True)
    name      = Column(String(80), nullable=False)
    area_ha   = Column(Float, nullable=False)          # hectares
    farm_id   = Column(Integer, ForeignKey("farms.id"))
    crop_year = Column(Integer)                        # safra 2025, 2026…

    farm  = relationship("Farm", back_populates="lots")
    crops = relationship("Crop", back_populates="lot", cascade="all, delete")
