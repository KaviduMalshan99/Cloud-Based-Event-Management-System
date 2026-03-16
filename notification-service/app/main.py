from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session

from .database import engine, Base, SessionLocal
from . import models, schemas

app = FastAPI(title="Notification Service")

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.post("/notify", response_model=schemas.NotificationResponse)
def send_notification(data: schemas.NotificationCreate, db: Session = Depends(get_db)):

    notification = models.Notification(
        user_email=data.user_email,
        message=data.message
    )

    db.add(notification)
    db.commit()
    db.refresh(notification)

    # simulate sending email
    print(f"Notification sent to {data.user_email}: {data.message}")

    return notification


@app.get("/notifications")
def get_notifications(db: Session = Depends(get_db)):
    return db.query(models.Notification).all()