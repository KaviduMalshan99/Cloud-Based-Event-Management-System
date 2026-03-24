from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import requests
import os
from .database import engine, Base, SessionLocal
from . import models, schemas
from .security import verify_token

EVENT_SERVICE_URL = os.getenv("EVENT_SERVICE_URL", "http://event-service:8000")
# -----------------------------
# App Initialization
# -----------------------------

app = FastAPI(title="Registration Service")


# -----------------------------
# CORS Configuration
# -----------------------------

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# -----------------------------
# Database Setup
# -----------------------------

try:
    if engine:
        Base.metadata.create_all(bind=engine)
        print("DB tables created")
except Exception as e:
    print("Skipping DB setup:", e)


def get_db():
    if SessionLocal is None:
        raise HTTPException(status_code=500, detail="Database not available")

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# Register for Event
# -----------------------------

@app.post("/register")
def register_event(
    data: schemas.RegisterEvent,
    db: Session = Depends(get_db),
    token_data: dict = Depends(verify_token)
):

    user_email = token_data.get("sub")

    # -----------------------------
    # Check event exists
    # -----------------------------

    try:
        event_response = requests.get(
            f"{EVENT_SERVICE_URL}/events/{data.event_id}",
            timeout=20
        )
    except requests.exceptions.RequestException as e:
        print("ERROR contacting Event Service:", e)
        raise HTTPException(status_code=503, detail="Event service unavailable")

    if event_response.status_code != 200:
        raise HTTPException(status_code=404, detail="Event not found")

    event = event_response.json()

    # -----------------------------
    # Prevent duplicate registration
    # -----------------------------

    existing = db.query(models.Registration).filter(
        models.Registration.event_id == data.event_id,
        models.Registration.user_email == user_email
    ).first()

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Already registered for this event"
        )

    # -----------------------------
    # Save registration
    # -----------------------------

    new_registration = models.Registration(
        event_id=data.event_id,
        user_email=user_email
    )

    db.add(new_registration)
    db.commit()
    db.refresh(new_registration)

    # -----------------------------
    # Notify Notification Service
    # -----------------------------

    try:
        requests.post(
            "http://notification-service:8004/notify",
            json={
                "user_email": user_email,
                "message": f"You successfully registered for {event['title']}"
            },
            timeout=20
        )
    except requests.exceptions.RequestException:
        print("Notification service unavailable")

    return {
        "message": "Registration successful",
        "event_id": new_registration.event_id,
        "user": new_registration.user_email
    }


# -----------------------------
# Get registrations of logged user
# -----------------------------

@app.get("/registrations")
def get_registrations(
    db: Session = Depends(get_db),
    token_data: dict = Depends(verify_token)
):

    user_email = token_data.get("sub")

    registrations = db.query(models.Registration).filter(
        models.Registration.user_email == user_email
    ).all()

    return registrations


# -----------------------------
# Admin - Get All Registrations
# -----------------------------

@app.get("/admin/registrations")
def get_all_registrations(
    db: Session = Depends(get_db),
    token_data: dict = Depends(verify_token)
):

    # allow only admin
    if token_data.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    registrations = db.query(models.Registration).all()

    return registrations