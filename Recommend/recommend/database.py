import os
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine
import json


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SECRET_FILE = os.path.join(BASE_DIR, 'secrets.json')
secrets = json.load(open(SECRET_FILE))
DB = secrets['DB']

DB_URL = f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8mb4"

# # 재훈 mac
# from urllib.parse import quote
# password_encoded = quote(DB['password'])
# DB_URL = f"mysql+pymysql://{DB['user']}:{password_encoded}@{DB['host']}:{DB['port']}/{DB['database']}?charset=utf8mb4"

engine = create_engine(
    DB_URL, connect_args = {"charset": "utf8mb4"}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()