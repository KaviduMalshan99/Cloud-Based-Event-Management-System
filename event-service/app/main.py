from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import engine, Base, SessionLocal
from . import models, schemas
from .security import verify_token
import requests

app = FastAPI(title="Event Service")


# -----------------------------
# CORS Configuration
# -----------------------------

origins = [
    "http://localhost:5173",  # Vite frontend
    "http://127.0.0.1:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,   # allow frontend
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
# Create Event (Admin only)
# -----------------------------

@app.post("/events", response_model=schemas.EventResponse)
def create_event(
    event: schemas.EventCreate,
    db: Session = Depends(get_db),
    token_data: dict = Depends(verify_token)
):

    if token_data.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    new_event = models.Event(
        title=event.title,
        description=event.description,
        location=event.location,
        event_date=event.event_date,
        capacity=event.capacity
    )

    db.add(new_event)
    db.commit()
    db.refresh(new_event)

    # 🔥 ADD THIS BLOCK (Notification)
    try:
        requests.post(
            "http://notification-service:8000/notify",
            json={
                "user_email": token_data.get("sub"),  # admin email
                "message": f"New event '{new_event.title}' created successfully"
            },
            timeout=5
        )
    except:
        print("Notification service not reachable")

    return new_event


# -----------------------------
# Get All Events
# -----------------------------

@app.get("/events", response_model=list[schemas.EventResponse])
def get_events(db: Session = Depends(get_db)):
    return db.query(models.Event).all()


# -----------------------------
# Get Single Event
# -----------------------------

@app.get("/events/{event_id}", response_model=schemas.EventResponse)
def get_event(event_id: int, db: Session = Depends(get_db)):

    event = db.query(models.Event).filter(models.Event.id == event_id).first()

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    return event


# -----------------------------
# Delete Event (Admin only)
# -----------------------------

@app.delete("/events/{event_id}")
def delete_event(
    event_id: int,
    db: Session = Depends(get_db),
    token_data: dict = Depends(verify_token)
):

    if token_data.get("role") != "admin":
        raise HTTPException(status_code=403, detail="Admin access required")

    event = db.query(models.Event).filter(models.Event.id == event_id).first()

    if not event:
        raise HTTPException(status_code=404, detail="Event not found")

    db.delete(event)
    db.commit()

    return {"message": "Event deleted successfully"}