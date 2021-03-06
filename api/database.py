from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import os

# connect_args={"check_same_thread": False} is only needed for sqlite

engine = create_engine(os.getenv("DATABASE_URL"))
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
