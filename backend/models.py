from sqlalchemy import Column, Integer, String, DateTime, func
from database import Base

class ModelFile(Base):
    __tablename__ = "model_files"

    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String, index=True)
    status = Column(String, default="Pending")
    upload_time = Column(DateTime(timezone=True), server_default=func.now())
