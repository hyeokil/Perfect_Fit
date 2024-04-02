import React, { useEffect, useState } from "react";
import BottomSheet from "@/components/charts/BottomSheet";
import Header from "@/components/layout/Header";
import Loading from "@/components/common/Loading"; // 로딩 컴포넌트 추가
import { useSongStore } from "@/store/useSongStore";
import axios from "axios";

const PreferenceChart: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태 추가
  const [songs, setSongs] = useState<any[]>([]);
  const setSelectedSong = useSongStore((state) => state.setSelectedSong);
  const selectedSong = useSongStore((state) => state.selectedSong);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          `https://j10c205.p.ssafy.io/recommendations/chart/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSongs(response.data);
        // console.log(response.data)
        setLoading(false); // 데이터 로딩 완료 후 상태 변경
      } catch (error) {
        console.error("노래를 못 가져옴 ", error);
        setLoading(false); // 데이터 로딩 실패 시 상태 변경
      }
    };

    fetchSongs();
  }, [userId]);

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

  const openBottomSheet = (song: any) => {
    setSelectedSong(song);
  };

  const closeBottomSheet = () => {
    setSelectedSong(null);
  };

  if (loading) {
    return <Loading />; // 로딩 중일 때 로딩 컴포넌트 반환
  }

  return (
    <div>
      <Header title="취향차트" state={["back", "search"]} />
      <div className="sing-container">
        <div className="sing-content">
          <div className="sing-chart">
            {songs.map((song) => (
              <div key={song.id} className="sing-song">
                <img src={song.song_thumbnail} alt={song.songTitle} />
                <div
                  className="sing-song-info"
                  onClick={() => openBottomSheet(song)}
                >
                  <h3>{song.song_title}</h3>
                  <p>{song.artist_name}</p>
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
                selectedSong ? selectedSong.song_thumbnail : ""
              }
            >
              {selectedSong && (
                <div className="song-bottom">
                  <img
                    src={selectedSong.song_thumbnail}
                    alt={selectedSong.song_title}
                  />
                  <div className="song-info">
                    <h2>{selectedSong.song_title}</h2>
                    <p>{selectedSong.artist_name}</p>
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

export default PreferenceChart;
