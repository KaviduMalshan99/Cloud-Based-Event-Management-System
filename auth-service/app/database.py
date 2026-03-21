from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
import os

# -----------------------------
# Database URL from environment
# -----------------------------
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise Exception("DATABASE_URL environment variable is not set")

# -----------------------------
# Create Engine
# -----------------------------
try:
    engine = create_engine(
        DATABASE_URL,
        pool_pre_ping=True,   # helps avoid stale connections
    )

    SessionLocal = sessionmaker(
        autocommit=False,
        autoflush=False,
        bind=engine
    )

    print("✅ Database connected")

except Exception as e:
    print("❌ Database connection failed:", e)
    engine = None
    SessionLocal = None

# -----------------------------
# Base Model
# -----------------------------
Base = declarative_base()


# -----------------------------
# Dependency (for FastAPI)
# -----------------------------
def get_db():
    if SessionLocal is None:
        raise Exception("Database not initialized")

    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()