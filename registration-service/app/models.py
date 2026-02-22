from sqlalchemy import Column, Integer, String
from .database import Base

class Registration(Base):
    __tablename__ = "registrations"

    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer)
    username = Column(String)