from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from .database import engine, Base, SessionLocal
from . import models, schemas
from .security import verify_token


app = FastAPI(title="Notification Service")

Base.metadata.create_all(bind=engine)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# Create Notification
# -----------------------------

@app.post("/notify", response_model=schemas.NotificationResponse)
def send_notification(
    data: schemas.NotificationCreate,
    db: Session = Depends(get_db)
):

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


# -----------------------------
# Get Notifications for Logged User
# -----------------------------

@app.get("/notifications")
def get_notifications(
    db: Session = Depends(get_db),
    token_data: dict = Depends(verify_token)
):

    user_email = token_data.get("sub")

    notifications = db.query(models.Notification).filter(
        models.Notification.user_email == user_email
    ).order_by(models.Notification.id.desc()).all()

    return notifications