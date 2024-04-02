import numpy as np
from sqlalchemy import func
from sqlalchemy.orm import Session
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from .models import Song, Reels, ReelsPlayTime, Member, SongHistory, MyList, Genre, Artist
from decimal import Decimal

from collections import Counter


# 장르 분류
genre_groups = {
    "팝": [20, 13, 14, 97, 145, 31, 154, 155, 33, 153, 52, 53, 66, 92, 113, 204],
    "록": [27, 13],
    "힙합": [1, 30, 47, 71, 58, 61, 64],
    "발라드": [8],
    "댄스": [3, 11, 18, 69, 82, 109, 180],
    "트로트": [5],
    "어쿠스틱": [21, 33, 36, 194],
    "R&B": [4, 7, 34, 61, 106],
    "재즈": [58, 68, 130, 179],
    "OST": [9, 12, 16, 25, 26, 32, 45, 65, 83, 85, 89],
    "동요": [23, 98, 99, 100, 176]
}

# 결과물 가공
def song_to_dict(song):
    return {
        'id': song.id,
        'song_title': song.song_title,
        'artist_name': song.artist.name if song.artist else None,
        'genre_name': song.genre.name if song.genre else None,
        'song_url': song.song_url,
        'song_origin_url': song.song_origin_url,
        'song_pitch': song.song_pitch,
        'song_release_date': song.song_release_date,
        'song_view': song.song_view,
        'song_thumbnail': song.song_thumbnail,
    }



################## 협업 필터링 ##################
# 유저의 노래 선호도를 가져오는 로직
def user_song_preference(db: Session, member_id: int):
    song_ids = []
    for x in db.query(SongHistory).filter(SongHistory.member_id == member_id).all():
        song_ids.append(x.song_id)
    for y in db.query(MyList).filter(MyList.member_id == member_id).all():
        song_ids.append(y.song_id)
    return set(song_ids)


def get_genre_proportions(db: Session, genre_groups: dict):
    # 각 유저별로 선호하는 장르의 ID 리스트 가져오기.
    preferences = db.query(
        SongHistory.member_id,
        Song.genre_id
    ).join(Song
    ).union(
        db.query(
            MyList.member_id,
            Song.genre_id
        ).join(Song)
    ).all()

    genre_proportions = {}
    for member_id, genre_ids in preferences:
        if member_id not in genre_proportions:
            genre_proportions[member_id] = {genre: 0 for genre in genre_groups.keys()}
        for group, ids in genre_groups.items():
            if genre_ids in ids:
                genre_proportions[member_id][group] += 1

    # 각 유저별 장르 비중 계산
    for member_id in genre_proportions:
        total = sum(genre_proportions[member_id].values())
        if total > 0:
            for genre in genre_proportions[member_id]:
                genre_proportions[member_id][genre] /= total

    # DataFrame로 변환
    df_genre_proportions = pd.DataFrame.from_dict(genre_proportions, orient='index')

    return df_genre_proportions


def get_cosine_similarity(db: Session, genre_groups: dict):
    df_genre_proportions = get_genre_proportions(db, genre_groups)
    df_genre_proportions.fillna(0, inplace=True)  
      
    # 코사인 유사도 계산
    cosine_sim_matrix = cosine_similarity(df_genre_proportions)
    
    # 자기 자신에 대한 유사도는 0으로
    np.fill_diagonal(cosine_sim_matrix, 0)
    
    # 결과를 DataFrame으로 변환하여 유저 ID에 맞게 인덱스와 컬럼 설정
    cosine_sim_df = pd.DataFrame(cosine_sim_matrix, index=df_genre_proportions.index, columns=df_genre_proportions.index)

    return cosine_sim_df


def recommend_songs(db: Session, target_user_id: int):
    df_genre_proportions = get_genre_proportions(db, genre_groups)
    cosine_sim = cosine_similarity(df_genre_proportions)
    cosine_sim_df = pd.DataFrame(cosine_sim, index=df_genre_proportions.index, columns=df_genre_proportions.index)
    np.fill_diagonal(cosine_sim_df.values, 0)

    top_similar_users = cosine_sim_df[target_user_id].sort_values(ascending=False).head(10).index.tolist()
    target_user_songs = user_song_preference(db, target_user_id)

    all_top_similar_users_songs = []
    for user_id in top_similar_users:
        all_top_similar_users_songs.extend(user_song_preference(db, user_id))

    recommended_song_ids = [song_id for song_id in all_top_similar_users_songs if song_id not in target_user_songs]
    top_counter = Counter(recommended_song_ids)
    
    most_common_songs = [song_id for song_id, _ in top_counter.most_common(25)]

    recommended_songs = db.query(Song).filter(Song.id.in_(most_common_songs)).all()
    recommended_songs_dicts = [song_to_dict(song) for song in recommended_songs]
    return recommended_songs_dicts



################## 콘텐츠 필터링 ##################
def content_recommend(db: Session, user_id: int):
    # 사용자가 좋아요를 누른 노래와 장르를 가져옴
    like_songs = db.query(Song.id, Artist.name.label("artist_name"), Genre.name.label("genre_name")).join(Artist).join(Genre).join(MyList, MyList.song_id == Song.id).filter(MyList.member_id == user_id).all()

    # 좋아하는 가수와 장르 리스트
    like_artists = set([song.artist_name for song in like_songs])
    like_genres = set([song.genre_name for song in like_songs])

    # 노래마다 점수 계산
    all_songs = db.query(Song, Artist.name.label("artist_name"), Genre.name.label("genre_name")).join(Artist).join(Genre).all()

    song_scores = []
    for song in all_songs:
        score = 0
        if song.artist_name in like_artists:
            score += 3
        if song.genre_name in like_genres:
            score += 2
        song_scores.append((song[0], score))

    # 상위 25개의 노래 추천
    song_scores.sort(key=lambda x: x[1], reverse=True)
    recommended_songs = song_scores[:25]

    recommended_songs_dicts = [song_to_dict(song[0]) for song in recommended_songs]

    return recommended_songs_dicts

