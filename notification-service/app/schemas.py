from pydantic import BaseModel

class NotificationCreate(BaseModel):
    user_email: str
    message: str

class NotificationResponse(BaseModel):
    id: int
    user_email: str
    message: str

    class Config:
        from_attributes = True