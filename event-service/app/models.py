from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from .database import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String, nullable=False, index=True)
    description = Column(String, nullable=False)

    location = Column(String, nullable=False)
    event_date = Column(String, nullable=False)

    capacity = Column(Integer, nullable=False)

    created_at = Column(DateTime, default=datetime.utcnow)