from sqlalchemy import Column, Integer, Float, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from .mixins import TimestampMixin

class Crop(TimestampMixin, Base):
    __tablename__ = "crops"

    id            = Column(Integer, primary_key=True, index=True)
    lot_id        = Column(Integer, ForeignKey("lots.id"), nullable=False)
    planted_date  = Column(Date)
    harvested_date= Column(Date)
    yield_bags    = Column(Float)      # sacas colhidas (60 kg)

    lot = relationship("Lot", back_populates="crops")
    financial_records = relationship("Financial", back_populates="crop",
                                     cascade="all, delete")
    stocks = relationship("Stock", back_populates="crop",
                          cascade="all, delete")
