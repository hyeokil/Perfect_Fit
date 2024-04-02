from datetime import datetime
from typing import Optional

from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from sqlalchemy.orm import relationship
from .database import Base
from pydantic import BaseModel


class ResponseModel(BaseModel):
   some_field: Optional[str] = None


class Song(Base):
    __tablename__ = 'song'
    id = Column(Integer, primary_key=True, index=True)
    song_title = Column(String)
    artist_id = Column(Integer, ForeignKey('artist.id'))
    genre_id = Column(Integer, ForeignKey('genre.id'))
    song_url = Column(String)
    song_origin_url = Column(String)
    reels = relationship('Reels', back_populates="song")
    artist = relationship('Artist', back_populates="song")
    genre = relationship('Genre', back_populates="song")
    song_pitch = Column(Integer)
    song_view = Column(Integer)
    song_thumbnail = Column(String)
    song_release_date = Column(String)

class Reels(Base):
    __tablename__ = 'reels'
    id = Column(Integer, primary_key=True, index=True)
    song_id = Column(Integer, ForeignKey('song.id'))
    member_id = Column(Integer, ForeignKey('member.id'))
    time = Column(Integer)
    path = Column(String)
    song = relationship('Song', back_populates="reels")
    member = relationship('Member', back_populates="reels")
    reels_play_time = relationship('ReelsPlayTime', back_populates="reels")


class Member(Base):
    __tablename__ = 'member'
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True)
    reels_play_time = relationship('ReelsPlayTime', back_populates="member")
    nickname = Column(String)
    reels = relationship('Reels', back_populates='member')
    followers = relationship('Follow', foreign_keys='Follow.follower_id', back_populates='follower')
    following = relationship('Follow', foreign_keys='Follow.following_id', back_populates='following')


class ReelsPlayTime(Base):
    __tablename__ = 'reels_play_time'
    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey('member.id'))
    reels_id = Column(Integer, ForeignKey('reels.id'))
    play_time = Column(Integer)
    created_at = Column(DateTime)
    reels = relationship('Reels', back_populates="reels_play_time")
    member = relationship('Member', back_populates="reels_play_time")

class Artist(Base):
    __tablename__ = 'artist'
    id = Column(Integer, primary_key=True)
    # name = Column(String)
    name = Column(String)
    song = relationship('Song', back_populates="artist")

class Genre(Base):
    __tablename__ = 'genre'
    id = Column(Integer, primary_key=True)
    name = Column(String)
    song = relationship('Song', back_populates="genre")

class SongHistory(Base):
    __tablename__ = 'song_history'
    created_at = Column(DateTime)
    id = Column(Integer, primary_key=True)
    member_id = Column(Integer, ForeignKey('member.id'))
    song_id = Column(Integer, ForeignKey('song.id'))
    updated_at = Column(DateTime)

class MyList(Base):
    __tablename__ = 'my_list'
    my_list_display = Column(Boolean)
    created_at = Column(DateTime)
    id = Column(Integer, primary_key=True)
    member_id = Column(Integer, ForeignKey('member.id'))
    song_id = Column(Integer, ForeignKey('song.id'))
    updated_at = Column(DateTime)

class Follow(Base):
    __tablename__ = 'follow'
    # id = Column(Integer, primary_key=True)
    active = Column(Boolean)
    follower_id = Column(Integer, ForeignKey('member.id'), primary_key=True)
    following_id = Column(Integer, ForeignKey('member.id'), primary_key=True)

    follower = relationship('Member', foreign_keys=[follower_id], back_populates="followers")
    following = relationship('Member', foreign_keys=[following_id], back_populates="following")
