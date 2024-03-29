import Loading from "@/components/common/Loading";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface Song {
  songId: number;
  songThumbnail: string;
  songTitle: string;
  artist: string;
  myListDisplay: boolean;
}

interface GenreProps {
  genre: string;
}

const Genres: React.FC<GenreProps> = ({ genre }) => {
  const [songs, setSongs] = useState<Song[] | null>(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `https://j10c205.p.ssafy.io/api/v1/song/chart/genre/${genre}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSongs(response.data.dataBody);
      } catch (error) {
        console.error("최신곡 못 받아옴", error);
      }
    };

    fetchSongs();
  }, [genre]);

  const toggleLike = async (song: Song) => {
    try {
      const token = localStorage.getItem("accessToken");
      const updatedSongData = { ...song, myListDisplay: !song.myListDisplay };
      await axios.post(
        `https://j10c205.p.ssafy.io/api/v1/myList/like/${song.songId}`,
        updatedSongData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSongs((prevSongs) => {
        if (prevSongs) {
          return prevSongs.map((prevSong) =>
            prevSong.songId === song.songId ? updatedSongData : prevSong
          );
        }
        return null;
      });
    } catch (error) {
      console.log("토글 실패", error);
    }
  };

  if (songs === null) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <div className="sing-container">
        <div className="sing-content">
          <div className="sing-chart">
            {songs.map((song, index) => (
              <div key={index} className="sing-song">
                <img src={song.songThumbnail} alt={song.songThumbnail} />
                <div className="sing-song-info">
                  <h3>{song.songTitle}</h3>
                  <p>{song.artist}</p>
                </div>
                <div
                  className="sing-song-like"
                  onClick={() => toggleLike(song)}
                >
                  {song.myListDisplay ? (
                    <img
                      src="././src/assets/icon/chart/liketrue.png"
                      alt="찜하기"
                    />
                  ) : (
                    <img
                      src="././src/assets/icon/chart/likefalse.png"
                      alt="찜하기 취소"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genres;
