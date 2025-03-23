from sqlalchemy.orm import Session
import models, schemas
import random

def get_models(db: Session):
    return db.query(models.ModelFile).all()

def create_model_file(db: Session, filename: str):
    db_model = models.ModelFile(filename=filename)
    db.add(db_model)
    db.commit()
    db.refresh(db_model)
    return db_model

def scan_model_file(db: Session, model_id: int):
    db_model = db.query(models.ModelFile).filter(models.ModelFile.id == model_id).first()
    if db_model:
        # Simulated threat scan (random)
        db_model.status = random.choice(["Safe", "Threat Detected"])
        db.commit()
        db.refresh(db_model)
    return db_model
