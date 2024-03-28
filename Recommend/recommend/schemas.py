from pydantic import BaseModel
from typing import List, Optional

class SongBase(BaseModel):
    song_title: str


class SongCreate(SongBase):
    pass