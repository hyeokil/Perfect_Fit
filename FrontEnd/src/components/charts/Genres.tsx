import Loading from "@/components/common/Loading";
import axios from "axios";
import React, { useEffect, useState } from "react";
import BottomSheet from "./BottomSheet";
import "@/styles/chart/Singchart.scss";
import Header from "../layout/Header";
import { useSongStore } from "@/store/useSongStore";

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
  const setSelectedSong = useSongStore((state) => state.setSelectedSong); // useSongStore에서 setSelectedSong 함수를 가져옵니다.
  const selectedSong = useSongStore((state) => state.selectedSong);

  const openBottomSheet = (song: any) => {
    setSelectedSong(song);
  };

  const closeBottomSheet = () => {
    setSelectedSong(null);
  };

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
      <Header title={genre} state={["back", "close"]} page="mainchart" />
      <div className="sing-container">
        <div className="sing-content">
          <div className="sing-chart">
            {/* 최신곡 차트들 여기에 쫙 뿌리기 */}
            {songs.map((song, index) => (
              <div key={index} className="sing-song">
                <img src={song.songThumbnail} alt={song.songThumbnail} />
                <div
                  className="sing-song-info"
                  onClick={() => openBottomSheet(song)}
                >
                  <h3>{song.songTitle}</h3>
                  <p>{song.artist}</p>
                </div>
                <div
                  className="sing-song-like"
                  onClick={() => toggleLike(song)}
                >
                  {song.myListDisplay ? (
                    <img
                      src="/icon/chart/liketrue.png"
                      alt="좋아요"
                    />
                  ) : (
                    <img
                      src="/icon/chart/likefalse.png"
                      alt="좋아요 취소"
                    />
                  )}
                </div>
              </div>
            ))}
            {/* 바텀시트 */}
            <BottomSheet
              isOpen={selectedSong !== null}
              onClose={closeBottomSheet}
              backgroundImageUrl={
                selectedSong ? selectedSong.songThumbnail : ""
              }
            >
              {selectedSong && (
                <div className="song-bottom">
                  {/* 선택된 노래의 정보 표시 */}
                  <img
                    src={selectedSong.songThumbnail}
                    alt={selectedSong.songTitle}
                  />
                  <div className="song-info">
                    <h2>{selectedSong.songTitle}</h2>
                    <p>{selectedSong.artist}</p>
                  </div>
                </div>
              )}
            </BottomSheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genres;
