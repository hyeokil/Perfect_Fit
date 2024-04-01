import numpy as np
from sqlalchemy import func
from sqlalchemy.orm import Session
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from .models import Follow, Song, Reels, ReelsPlayTime, Member
from decimal import Decimal


def fetch_data(db: Session):
    results = db.query(
        ReelsPlayTime.member_id.label("watcher_id"),
        ReelsPlayTime.reels_id.label("reels_id"),
        Song.artist_id,
        Song.genre_id,
        Reels.member_id.label("creator_id"),
        func.sum(ReelsPlayTime.play_time.label("total_play_time"))
    ).join(Reels, ReelsPlayTime.reels_id == Reels.id
    ).join(Song, Reels.song_id == Song.id
           ).group_by(ReelsPlayTime.member_id, ReelsPlayTime.reels_id, Song.artist_id, Song.genre_id, Reels.member_id
                             ).order_by(ReelsPlayTime.member_id).all()
    return results
# watcher_id, reels_id, artist_id, genre_id, creator_id, total_play_time
# [(1, 84, 970, 11, 323, Decimal('811')), (1, 256, 3184, 6, 716, Decimal('1074')),
#  (1, 563, 2407, 22, 452, Decimal('2661')),


# member_id, reels_id, total_play_time으로 DataForm만들기 위한 data
def fetch_reels_playtime_data(db: Session):
    results = db.query(
     ReelsPlayTime.member_id,
     ReelsPlayTime.reels_id,
     func.sum(ReelsPlayTime.play_time).label("total_play_time")
    ).group_by(ReelsPlayTime.member_id, ReelsPlayTime.reels_id
               ).all()
    return results


def follow_data(db: Session):
    results = (db.query(
        Reels.id.label("reels_id"),
        Reels.member_id.label('creator_id')
    )).all()
    df_reels = pd.DataFrame(results, columns=['reels_id', 'creator_id'])
    return df_reels


# member_id 행, reels_id 열, total_play_time 값
def create_reels_playtime_dataframe(results, db: Session):
    all_member_ids = db.query(Member.id).order_by(Member.id).all()
    all_reels_ids = db.query(Reels.id).order_by(Reels.id).all()

    df_full = pd.DataFrame(index=[m[0] for m in all_member_ids], columns=[r[0] for r in all_reels_ids]).fillna(0)

    for row in results:
        member_id, reels_id, play_time = row
        df_full.at[member_id, reels_id] = int(play_time)

    return df_full

# 모든 멤버 index
def member_data(db: Session):
    member_ids = db.query(Member.id).order_by(Member.id).all()
    member_ids_list = [id[0] for id in member_ids]
    return member_ids_list

# 멤버 숫자
def get_member_count(db: Session):
    member_count = db.query(func.count(Member.id)).scalar()
    return member_count

def create_dataframe(results):
    modified_results = []
    for row in results:
        modified_row = list(row)
        modified_row[-1] = float(modified_row[-1]) if isinstance(modified_row[-1], Decimal) else modified_row[-1]
        modified_results.append(modified_row)

    data = pd.DataFrame(modified_results, columns=["reels_id", "member_id", "artist_id", "genre_id", "creator_id", "total_play_time"])
    return data
#  reels_id  member_id  artist_id  genre_id  creator_id  total_play_time
# 0         630        318        568        20         108           4519.0
# 1         744        686       5121         8         522           6980.0
# 2          68        765        865        12         275           6465.0

# 유저 선호도
def generate_user_preferences(db: Session, member_id: int, df_watch_times, n_preferences: 5):
    user_data = df_watch_times[df_watch_times['member_id'] ==member_id]

    genre = user_data.groupby('genre_id')['total_play_time'].sum().nlargest(n_preferences).index.tolist()
    artist = user_data.groupby('artist_id')['total_play_time'].sum().nlargest(n_preferences).index.tolist()
    creator = user_data.groupby('creator_id')['total_play_time'].sum().nlargest(n_preferences).index.tolist()

    user_prefer = {
        "genre": genre,
        "artist": artist,
        "creator": creator,
    }
    return user_prefer

# 협업 필터링
def recommend_videos_for_user(member_id: int, db: Session, df_watch_times, top_similar_users):
    similar_users = top_similar_users[member_id]
    recommend_scores = pd.Series(0, index=df_watch_times.columns)

    for similar_user in similar_users:
        recommend_scores += df_watch_times.loc[similar_user]

    watch_videos = df_watch_times.loc[member_id] > 0
    recommended_scores = recommend_scores[~watch_videos]

    return recommended_scores


def create_empty_df(index, columns):
    return pd.DataFrame(0, index=index, columns=columns)

# artist, genre, creator에 대한 코사인 유사도를 구한 후 평균
def sum_cosine_similarity(results, db:Session):
    all_member_ids = member_data(db)
    df = pd.DataFrame(results, columns=['member_id', 'reels_id', 'artist_id', 'genre_id', 'creator_id', 'total_play_time'])
    all_artist_ids = df['artist_id'].unique()
    all_genre_ids = df['genre_id'].unique()
    all_creator_ids = df['creator_id'].unique()

    df_empty_artist = create_empty_df(all_member_ids, all_artist_ids)
    df_empty_genre = create_empty_df(all_member_ids, all_genre_ids)
    df_empty_creator = create_empty_df(all_member_ids, all_creator_ids)

    for _, row in df.iterrows():
        if row['member_id'] in df_empty_artist.index and row['artist_id'] in df_empty_artist.columns:
            df_empty_artist.at[row['member_id'], row['artist_id']] = int(row['total_play_time'])

        if row['member_id'] in df_empty_genre.index and row['genre_id'] in df_empty_genre.columns:
            df_empty_genre.at[row['member_id'], row['genre_id']] = int(row['total_play_time'])

        if row['member_id'] in df_empty_creator.index and row['creator_id'] in df_empty_creator.columns:
            df_empty_creator.at[row['member_id'], row['creator_id']] = int(row['total_play_time'])

    cosine_sim_artist = cosine_similarity(df_empty_artist)
    cosine_sim_genre = cosine_similarity(df_empty_genre)
    cosine_sim_creator = cosine_similarity(df_empty_creator)

    avg_cosine_sim = (cosine_sim_artist + cosine_sim_genre + cosine_sim_creator) / 3
    np.fill_diagonal(avg_cosine_sim, 0)

    df_cosine_sim = pd.DataFrame(avg_cosine_sim, index=all_member_ids, columns=all_member_ids)

    #유사한 member
    return df_cosine_sim
#       1         2         3         4         5         6         7         8     ...      993       994       995       996       997       998       999   1000
# 1     1.200000  0.234768  0.256665  0.255960  0.365110  0.266124  0.244893  0.354287  ...  0.288246  0.215260  0.307537  0.200000  0.219083  0.364468  0.381938   0.2
# 2     0.234768  1.200000  0.304130  0.238145  0.437261  0.416396  0.391952  0.224475

# 유사한 멤버 목록
def top_similar_user(db: Session):
    watch_data = fetch_data(db)
    cosine = sum_cosine_similarity(watch_data, db)
    member_count = get_member_count(db)

    top_similar_users = {i + 1: cosine.loc[i + 1].nlargest(100).index.tolist() for i in range(member_count)}

    return top_similar_users

# 콘텐츠 기반 필터링 점수
def calculate_content_based_score(df_videos, user_prefer):
    scores = pd.Series(0, index=df_videos.index)

    for index, video in df_videos.iterrows():
        score = 0
        if video['genre_id'] in user_prefer['genre']:
            score += 1
        if video['artist_id'] in user_prefer['artist']:
            score += 1
        if video['creator_id'] in user_prefer['creator']:
            score += 1
        scores.at[index] = score
    return scores


def calculate_follow_score(df_reels, member_id, following_ids):
    scores = pd.Series(0.0, index=df_reels.index)

    if following_ids:
        for index, video in df_reels.iterrows():
            if video['creator_id'] in following_ids:
                scores.at[index] += 0.4

    return scores


# 정규화
def normalize_scores(scores):
    min_score = scores.min()
    max_score = scores.max()
    if max_score == min_score:
        return pd.Series(0, index=scores.index)
    else:
        normalized_scores = (scores - min_score) / (max_score)
        return normalized_scores

# hybrid filtering
def generate_hybrid_recommendations(member_id, db, n_recommendations=200):
    # # 데이터 로딩 및 전처리
    watch_data = fetch_data(db)
    df_watch_times = create_dataframe(watch_data)
    similar_user = top_similar_user(db)
    reels = fetch_reels_playtime_data(db)

    df_reels = follow_data(db)
    df_reels.set_index('reels_id', inplace=True)
    following_ids = db.query(Follow.follower_id).filter(Follow.following_id == member_id).all()
    following_ids = [id[0] for id in following_ids]

    df_videos = create_reels_playtime_dataframe(reels, db)

    user_prefer = generate_user_preferences(db, member_id, df_watch_times,5)
    content_scores = calculate_content_based_score(df_watch_times, user_prefer)

    follow_scores = calculate_follow_score(df_reels, member_id, following_ids)

    # 협업 필터링 점수
    collaborative_scores = recommend_videos_for_user(member_id, db, df_videos, similar_user)

    all_indices = collaborative_scores.index.union(content_scores.index)
    collaborative_scores = collaborative_scores.reindex(all_indices, fill_value=0)
    content_scores = content_scores.reindex(all_indices, fill_value=0)
    #
    collaborative_scores_normalized = normalize_scores(collaborative_scores)
    content_scores_normalized = normalize_scores(content_scores)

    final_scores = (collaborative_scores_normalized * 0.6) + (content_scores_normalized * 0.3) + follow_scores

    recommendations = final_scores.sort_values(ascending=False)

    top_reels_ids = recommendations.head(100).index.tolist()

    reels_details = db.query(Reels).filter(Reels.id.in_(top_reels_ids)).all()

    final_recommendations = []
    for reels in reels_details:
        score = recommendations.get(reels.id, 0)
        final_recommendations.append({
            "reels_id": reels.id,
            "score": score,
            "reels_path": reels.path,
            "reels_time": reels.time,
            "member_id": reels.member_id,
            "song_id": reels.song_id
        })

    final_recommendations.sort(key=lambda x: x["score"], reverse=True)

    return final_recommendations