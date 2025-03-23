from fastapi import FastAPI, UploadFile, File, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware  
from sqlalchemy.orm import Session
from database import SessionLocal, engine, Base
import crud, models, schemas
import shutil
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TrojAI Secure Model Registry")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "./uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def root():
    return {"message": "Welcome to TrojAI Model Registry!"}

@app.post("/upload", response_model=schemas.ModelFile)
async def upload_model(file: UploadFile = File(...), db: Session = Depends(get_db)):
    file_location = f"{UPLOAD_FOLDER}/{file.filename}"

    with open(file_location, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    db_model = crud.create_model_file(db=db, filename=file.filename)

    return db_model

@app.get("/models", response_model=list[schemas.ModelFile])
def list_models(db: Session = Depends(get_db)):
    return crud.get_models(db)

@app.post("/scan/{model_id}", response_model=schemas.ModelFile)
def scan_model(model_id: int, db: Session = Depends(get_db)):
    db_model = crud.scan_model_file(db=db, model_id=model_id)
    if not db_model:
        raise HTTPException(status_code=404, detail="Model not found")
    return db_model
