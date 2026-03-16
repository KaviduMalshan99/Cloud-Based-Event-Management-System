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
    user_email = token_data.get("sub")

    # Check event exists by calling Event Service
    try:
        event_response = requests.get("http://event-service:8000/events")
    except requests.exceptions.RequestException:
        raise HTTPException(status_code=503, detail="Event service unavailable")

    if event_response.status_code != 200:
        raise HTTPException(status_code=400, detail="Event service error")

    events = event_response.json()

    event_exists = any(event["id"] == data.event_id for event in events)

    if not event_exists:
        raise HTTPException(status_code=404, detail="Event not found")

    # Prevent duplicate registration
    existing = db.query(models.Registration).filter(
        models.Registration.event_id == data.event_id,
        models.Registration.user_email == user_email
    ).first()

    if existing:
        raise HTTPException(status_code=400, detail="Already registered for this event")

    # Save registration
    new_registration = models.Registration(
        event_id=data.event_id,
        user_email=user_email
    )

    db.add(new_registration)
    db.commit()
    db.refresh(new_registration)

    # Call Notification Service
    try:
        requests.post(
            "http://notification-service:8000/notify",
            json={
                "user_email": user_email,
                "message": f"You have successfully registered for event {data.event_id}"
            }
        )
    except requests.exceptions.RequestException:
        print("Notification service unavailable")

    return {
        "message": "Registration successful",
        "event_id": new_registration.event_id,
        "user": new_registration.user_email
    }


@app.get("/registrations")
def get_registrations(db: Session = Depends(get_db)):
    return db.query(models.Registration).all()