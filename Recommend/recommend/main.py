from pydantic import BaseModel
from sqlalchemy.orm import Session
from recommend.database import engine, SessionLocal
from fastapi import FastAPI, Depends
from . import crud, models
from typing import List

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ReelsResponse(BaseModel):
    id: int
    path: str
    time: int
    score: float
    # member_id: int
    # song_id: int
    member_nickname: str
    song_title: str

class Recommendation(BaseModel):
    recommendations: List[ReelsResponse]


@app.get("/recommendations/{member_id}", response_model=Recommendation)
async def read_recommendations(member_id: int, db: Session = Depends(get_db)):
    recommendations = crud.generate_hybrid_recommendations(member_id, db, n_recommendations=200)
    response_list = []
    for recommendation in recommendations:
        reel = db.query(models.Reels).filter(models.Reels.id == recommendation["reels_id"]).first()
        if reel:
            # Member 테이블에서 nickname 가져오기
            member = db.query(models.Member).filter(models.Member.id == reel.member_id).first()
            member_nickname = member.nickname if member else "Unknown"

            # Song 테이블에서 song_title 가져오기
            song = db.query(models.Song).filter(models.Song.id == reel.song_id).first()
            song_title = song.song_title if song else "Unknown Title"

            response_list.append(ReelsResponse(id=reel.id, path=reel.path, time=reel.time, score=recommendation["score"], member_nickname=member_nickname, song_title=song_title))
    return Recommendation(recommendations=response_list)