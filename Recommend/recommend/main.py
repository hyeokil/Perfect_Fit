from pydantic import BaseModel
from sqlalchemy.orm import Session
from recommend.database import engine, SessionLocal
from fastapi import FastAPI, Depends, HTTPException
from . import crud, models, chart_crud
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
    userPath: str
    audioPath: str
    time: int
    score: float
    memberNickname: str
    songTitle: str
    follow: bool
    memberId: int

class Recommendation(BaseModel):
    recommendations: List[ReelsResponse]


@app.get("/recommendations/reels/{memberId}", response_model=Recommendation)
async def read_recommendations(memberId: int, db: Session = Depends(get_db)):
    recommendations = crud.generate_hybrid_recommendations(memberId, db, n_recommendations=200)
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

            is_followed = recommendation.get("is_followed", False)

            response_list.append(ReelsResponse(id=reel.id, userPath=reel.user_path, audioPath=reel.audio_path, time=reel.time, score=recommendation["score"], memberNickname=member_nickname, songTitle=song_title, follow=is_followed, memberId=reel.member_id))
    return Recommendation(recommendations=response_list)


@app.get("/recommendations/chart/{memberId}")
def chart_recommendations(memberId: int, db: Session = Depends(get_db)):
    # 사용자 ID{memberId}를 기반으로 하이브리드 기반 필터링 추천 노래 목록 return
    collaborative_recommend_list = chart_crud.recommend_songs(db, memberId)  # 협업 필터링
    content_recommend_list = chart_crud.content_recommend(db, memberId)  # 콘텐츠 필터링
    
    result = collaborative_recommend_list + content_recommend_list

    return result
