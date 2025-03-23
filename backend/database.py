import os
import time
from sqlalchemy import create_engine
from sqlalchemy.exc import OperationalError
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://trojaiuser:trojaipass@host.docker.internal:5432/trojai"
)

# Retry Logic
MAX_RETRIES = 10
RETRY_INTERVAL = 5  # seconds

attempt = 0
while attempt < MAX_RETRIES:
    try:
        engine = create_engine(DATABASE_URL)
        connection = engine.connect()
        connection.close()
        print(f"✅ Successfully connected to the database on attempt {attempt + 1}")
        break
    except OperationalError as e:
        print(f"❌ Database connection failed: {e}")
        attempt += 1
        time.sleep(RETRY_INTERVAL)
else:
    print("❌ Could not connect to the database after several retries. Exiting.")
    exit(1)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
