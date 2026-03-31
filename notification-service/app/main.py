from fastapi import FastAPI, Depends, HTTPException, Request
from sqlalchemy.orm import Session

from .database import engine, Base, SessionLocal
from . import models, schemas

app = FastAPI(title="Notification Service")


# -----------------------------
# Database Setup
# -----------------------------
try:
    if engine:
        Base.metadata.create_all(bind=engine)
        print("DB tables created")
except Exception as e:
    print("Skipping DB setup:", e)


# -----------------------------
# DB Dependency
# -----------------------------
def get_db():
    if SessionLocal is None:
        raise HTTPException(status_code=500, detail="Database not available")

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# -----------------------------
# Health Check
# -----------------------------
@app.get("/")
def root():
    return {"message": "Notification Service is running"}


# -----------------------------
# Create Notification
# -----------------------------
@app.post("/notify", response_model=schemas.NotificationResponse)
def send_notification(
    data: schemas.NotificationCreate,
    db: Session = Depends(get_db)
):
    try:
        notification = models.Notification(
            user_email=data.user_email,
            message=data.message
        )

        db.add(notification)
        db.commit()
        db.refresh(notification)

        print(f"Notification sent to {data.user_email}: {data.message}")

        return notification

    except Exception as e:
        db.rollback()
        print("❌ Error creating notification:", str(e))
        raise HTTPException(status_code=500, detail="Failed to create notification")


# -----------------------------
# Get Notifications (FIXED)
# -----------------------------
@app.get("/notifications")
def get_notifications(
    request: Request,
    db: Session = Depends(get_db)
):
    try:
        # 🔥 manually extract query param
        user_email = request.query_params.get("user_email")

        print("🔥 RECEIVED EMAIL:", user_email)

        if not user_email:
            return []

        notifications = db.query(models.Notification).filter(
            models.Notification.user_email == user_email
        ).order_by(models.Notification.id.desc()).all()

        return notifications

    except Exception as e:
        print("❌ ERROR:", str(e))
        return []