from datetime import datetime
from sqlalchemy import Column, DateTime

class TimestampMixin:
    """Mixin that adds timestamp fields for creation and updates."""

    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False,
    )