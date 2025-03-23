from pydantic import BaseModel
from datetime import datetime

class ModelFileBase(BaseModel):
    filename: str

class ModelFileCreate(ModelFileBase):
    pass

class ModelFile(ModelFileBase):
    id: int
    status: str
    upload_time: datetime

    class Config:
        orm_mode = True  
