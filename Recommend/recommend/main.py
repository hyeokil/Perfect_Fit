from pydantic import BaseModel
from sqlalchemy.orm import Session
from recommend.database import engine, SessionLocal
from fastapi import FastAPI, Depends
from . import crud, models
from typing import List

from .models import ResponseModel

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class RecommendationItem(BaseModel):
    index: int
    score: float

class Recommendation(BaseModel):
    recommendations: List[RecommendationItem]

def convert_to_response(recommendations):
    recommendations_list = [{"index": int(index), "score": float(score)} for index, score in recommendations.items()]
    return Recommendation(recommendations = recommendations_list)

@app.get("/recommendations/{member_id}", response_model=Recommendation)
async def read_recommendations(member_id: int, db: Session = Depends(get_db)):
    recommendations = crud.generate_hybrid_recommendations(member_id, db, n_recommendations=200)
    recommendations_response = convert_to_response(recommendations)
    return recommendations_response