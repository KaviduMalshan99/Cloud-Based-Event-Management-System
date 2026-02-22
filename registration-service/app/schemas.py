from pydantic import BaseModel

class RegisterEvent(BaseModel):
    event_id: int