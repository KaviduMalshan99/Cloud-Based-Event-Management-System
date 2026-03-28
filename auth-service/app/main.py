from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

from .database import engine, Base, SessionLocal
from . import models, schemas, security

app = FastAPI(title="Auth Service")


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
# Syatem Health
# -----------------------------

@app.get("/health")
def health():
    return {"status": "Auth Service is running"}


# -----------------------------
# Register User
# -----------------------------

@app.post("/register")
def register(user: schemas.UserCreate, db: Session = Depends(get_db)):

    existing_user = db.query(models.User).filter(models.User.email == user.email).first()

    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    hashed_password = security.hash_password(user.password)

    new_user = models.User(
        username=user.username,
        email=user.email,
        password=hashed_password,
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User registered successfully"}


# -----------------------------
# Login
# -----------------------------

@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(models.User).filter(models.User.email == user.email).first()

    if not db_user or not security.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = security.create_access_token(
        data={
            "sub": db_user.email,
            "role": db_user.role
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "role": db_user.role
    }


# -----------------------------
# Token Verification
# -----------------------------

@app.get("/verify-token")
def verify_token(token: str):

    payload = security.verify_token(token)

    if not payload:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

    return {
        "valid": True,
        "user": payload["sub"],
        "role": payload["role"]
    }


# -----------------------------
# Get All Users
# -----------------------------

@app.get("/users")
def get_users(db: Session = Depends(get_db)):

    users = db.query(models.User).all()

    if not users:
        return {"message": "No users found"}

    return users