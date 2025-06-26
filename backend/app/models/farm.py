from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from .mixins import TimestampMixin

class Farm(TimestampMixin, Base):

    id        = Column(Integer, primary_key=True, index=True)
    name      = Column(String(120), nullable=False)
    location  = Column(String(120))
    owner_id  = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="farms")
    lots  = relationship("Lot", back_populates="farm", cascade="all, delete")
