from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from .database import engine, Base, SessionLocal
from . import models, schemas
from .security import verify_token

app = FastAPI(title="Event Service")

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

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
        capacity=event.capacity
    )

    db.add(new_event)
    db.commit()
    db.refresh(new_event)

    return new_event

@app.get("/events")
def get_events(db: Session = Depends(get_db)):
    return db.query(models.Event).all()