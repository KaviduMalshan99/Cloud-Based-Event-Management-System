from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
import requests

from .database import engine, Base, SessionLocal
from . import models, schemas
from .security import verify_token

app = FastAPI(title="Registration Service")

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/register-event")
def register_event(
    data: schemas.RegisterEvent,
    db: Session = Depends(get_db),
    token_data: dict = Depends(verify_token)
):
    username = token_data.get("sub")

    # Call Event Service to verify event exists
    event_response = requests.get(
        f"http://event-service:8000/events"
    )

    if event_response.status_code != 200:
        raise HTTPException(status_code=400, detail="Event service unavailable")

    events = event_response.json()

    event_exists = any(e["id"] == data.event_id for e in events)

    if not event_exists:
        raise HTTPException(status_code=404, detail="Event not found")

    # Prevent duplicate registration
    existing = db.query(models.Registration).filter_by(
        event_id=data.event_id,
        username=username
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Already registered")

    new_registration = models.Registration(
        event_id=data.event_id,
        username=username
    )

    db.add(new_registration)
    db.commit()

    return {"message": "Registered successfully"}