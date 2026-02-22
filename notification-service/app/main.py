from fastapi import FastAPI

app = FastAPI(title="Notification Service")

@app.get("/")
def root():
    return {"message": "Notification Service Running"}

@app.get("/health")
def health():
    return {"status": "healthy"}