from datetime import timedelta, datetime
from sqlalchemy import func, and_
from sqlalchemy.orm import Session
from . import models
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from .models import Song, Reels, ReelsPlayTime, Member
from decimal import Decimal


def fetch_data(db: Session):
    results = db.query(
        ReelsPlayTime.member_id.label("watcher_id"),
        Song.artist_id,
        Song.genre_id,
        Reels.member_id.label("creator_id"),
        func.sum(ReelsPlayTime.play_time.label("total_play_time"))
    ).join(Reels, ReelsPlayTime.reels_id == Reels.id
    ).join(Song, Reels.song_id == Song.id
           ).group_by(ReelsPlayTime.member_id, Song.artist_id, Song.genre_id, Reels.member_id
                             ).all()
    return results


def create_dataframe(results):
    modified_results = []
    for row in results:
        modified_row = list(row)
        modified_row[-1] = float(modified_row[-1]) if isinstance(modified_row[-1], Decimal) else modified_row[-1]
        modified_results.append(modified_row)
    # for row in modified_results:
        # print('나와라',[type(value) for value in row], row)
        # print(modified_results)

    # 조회한 데이터를 DataFrame으로 변환
    data = pd.DataFrame(modified_results, columns=["member_id", "artist_id", "genre_id", "creator_id", "total_play_time"])

    return data


def calculate_similarity(df_watch_times):
    # df_watch_times는 사용자별 비디오 시청 시간이 포함된 DataFrame
    similarity_matrix = cosine_similarity(df_watch_times)
    return pd.DataFrame(similarity_matrix, index=df_watch_times.index, columns=df_watch_times.index)

def recommend_videos_for_user(user_id, df_watch_times, similarity_matrix, num_recommendation=5):
    # 유사한 사용자 찾기
    similar_users = similarity_matrix[user_id].sort_values(ascending=False).iloc[1:num_recommendation+1].index
    recommended_scores = pd.Series(0, index=df_watch_times.columns)

    for similar_user in similar_users:
        recommended_scores += df_watch_times.loc[similar_user]

    watch_videos = df_watch_times.loc[user_id] > 0
    recommended_scores = recommended_scores[~watch_videos]
    return recommended_scores.sort_values(ascending=False).head(num_recommendation)


def fetch_user_preferences(db: Session, member_id: int):

    subquery = db.query(
        ReelsPlayTime.reels_id,
        func.sum(ReelsPlayTime.play_time).label("total_play_time")
    ).group_by(ReelsPlayTime.reels_id).subquery()

    query = db.query(
        ReelsPlayTime.member_id.label("watcher_id"),
        Reels.member_id.label("creator_id"),
        Song.artist_id,
        Song.genre_id,
        subquery.c.total_play_time
    ).join(
        Reels, ReelsPlayTime.reels_id == Reels.id
    ).join(
        Song, Reels.song_id == Song.id
    ).join(
        subquery, subquery.c.reels_id == ReelsPlayTime.reels_id
    ).group_by(ReelsPlayTime.member_id, Reels.member_id, Song.artist_id, Song.genre_id, subquery.c.total_play_time)

    results = query.all()
    return results


def identify_preferences(results, n=3):
    df = pd.DataFrame(results, columns=["member_id", "artist_id", "genre_id", "creator_id", "total_play_time"])
    # print('제발', df.columns)
    artist_pref = df.groupby("artist_id")["total_play_time"].sum().sort_values(ascending=False).head(n)
    genre_pref = df.groupby("genre_id")["total_play_time"].sum().sort_values(ascending=False).head(n)
    creator_pref = df.groupby("creator_id")["total_play_time"].sum().sort_values(ascending=False).head(n)

    return {"artist_id": artist_pref.index.tolist(), "genre_id": genre_pref.index.tolist(), "creator_id": creator_pref.index.tolist()}


def calculate_content_based_score(df_videos, member_id, db: Session):
    user_preferences_data = fetch_user_preferences(db, member_id)
    # 리스트를 DataFrame으로 변환
    user_preferences_df = pd.DataFrame(user_preferences_data,
                                       columns=["member_id", "artist_id", "genre_id", "creator_id", "total_play_time"])
    # 결측치를 0으로 채우기
    user_preferences_df.fillna(0, inplace=True)

    # 여기서부터 기존의 로직을 계속 진행
    user_prefer = identify_preferences(user_preferences_df)
    scores = pd.Series(0, index=df_videos.index)

    for index, video in df_videos.iterrows():
        score = 0
        if video['genre_id'] in user_prefer['genre_id']:
            score += 1
        if video['artist_id'] in user_prefer['artist_id']:
            score += 1
        if video['creator_id'] in user_prefer['creator_id']:
            score += 1
        scores.at[index] = score

    return scores


def combine_scores(collab_scores, content_scores):
    # 협업 필터링 점수와 콘텐츠 기반 필터링 점수 결합
    combined_scores = pd.Series(0, index=content_scores.index)

    # 콘텐츠 기반 필터링 점수 적용 (기본값)
    combined_scores.update(content_scores)

    # 협업 필터링 점수가 있는 경우에만 적용
    if not collab_scores.empty:
        # 협업 필터링 점수 업데이트 (기존 콘텐츠 점수에 더하기)
        combined_scores.update(collab_scores, fill_value=0)

        # 두 점수의 평균을 사용하는 경우
        combined_scores = combined_scores / 2

    return combined_scores


def generate_hybrid_recommendations(member_id, db, n_recommendations=200):
    # 데이터 로딩 및 전처리
    watch_data = fetch_data(db)
    df_watch_times = create_dataframe(watch_data)
    similarity_matrix = calculate_similarity(df_watch_times)
    collab_scores = recommend_videos_for_user(member_id, df_watch_times, similarity_matrix, n_recommendations)

    member_preferences = fetch_user_preferences(db, member_id)
    df_preferences = create_dataframe(member_preferences)
    content_scores = calculate_content_based_score(df_videos=df_preferences, member_id=member_id, db=db)

    # 점수 결합
    final_scores = combine_scores(collab_scores, content_scores)

    # 최종 추천
    recommendations = final_scores.sort_values(ascending=False).head(n_recommendations)
    print('안녕', recommendations)
    return recommendations