from pydantic import BaseModel


class RegisterEvent(BaseModel):
    event_id: int


class RegistrationResponse(BaseModel):
    id: int
    event_id: int
    user_email: str

    class Config:
        from_attributes = True