from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime
from .database import Base

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    message = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)