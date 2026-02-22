from pydantic import BaseModel

class EventCreate(BaseModel):
    title: str
    description: str
    capacity: int

class EventResponse(BaseModel):
    id: int
    title: str
    description: str
    capacity: int

    class Config:
        from_attributes = True