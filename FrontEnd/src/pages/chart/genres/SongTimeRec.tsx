import BottomSheet from "@/components/charts/BottomSheet";
import Header from "@/components/layout/Header";
import { useSongStore } from "@/store/useSongStore";
import axios from "axios";
import React, { useEffect, useState } from "react";

const SongTimeRec: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  const [songs, setSongs] = useState<any[]>([]);
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
          "https://j10c205.p.ssafy.io/api/v1/song/chart/current",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSongs(response.data.dataBody); // 받아온 데이터를 최대 3개로 슬라이스하여 저장합니다.
        // console.log(response.data.dataBody);
      } catch (error) {
        console.error("Failed to fetch songs", error);
      }
    };

    fetchSongs();

    // 현재 시간 설정
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, "0");
      const minutes = date.getMinutes().toString().padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}`);
    }, 100); // 매 초마다 현재 시간 업데이트

    // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 setInterval을 정리
    return () => clearInterval(interval);
  }, []);

  const toggleLike = async (song: any) => {
    try {
      const token = localStorage.getItem("accessToken");
      const updatedSongData = {
        ...song,
        myListDisplay: !song.myListDisplay,
      };
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
          return prevSongs.map((prevSong) => {
            if (prevSong.songId === song.songId) {
              return updatedSongData;
            }
            return prevSong;
          });
        }
        return [];
      });
    } catch (error) {
      console.error("토글 실패", error);
    }
  };

  return (
    <div>
      <Header
        title={`${currentTime} 기준 많이 부르는 노래`}
        state={["back", "search"]}
      />
      <div className="sing-container">
        <div className="sing-content">
          <div className="sing-chart">
            {songs.map((song) => (
              <div key={song.songId} className="sing-song">
                <img src={song.songThumbnail} alt={song.songTitle} />
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
                      src="././src/assets/icon/chart/liketrue.png"
                      alt="좋아요"
                    />
                  ) : (
                    <img
                      src="././src/assets/icon/chart/likefalse.png"
                      alt="좋아요 취소"
                    />
                  )}
                </div>
              </div>
            ))}
            <BottomSheet
              isOpen={selectedSong !== null}
              onClose={closeBottomSheet}
              backgroundImageUrl={
                selectedSong ? selectedSong.songThumbnail : ""
              }
            >
              {selectedSong && (
                <div className="song-bottom">
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

export default SongTimeRec;
