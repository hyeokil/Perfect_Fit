import BottomSheet from "@/components/charts/BottomSheet";
import Header from "@/components/layout/Header";
import { useSongStore } from "@/store/useSongStore";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PreferenceChart: React.FC = () => {
  const [Songs, setSongs] = useState<any[]>([]);
  const setSelectedSong = useSongStore((state) => state.setSelectedSong); // useSongStore에서 setSelectedSong 함수를 가져옵니다.
  const selectedSong = useSongStore((state) => state.selectedSong);

  const openBottomSheet = (song: any) => {
    setSelectedSong(song);
  };

  const closeBottomSheet = () => {
    setSelectedSong(null);
  };

  useEffect(() => {
    const fetchLikedSongs = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://j10c205.p.ssafy.io/recommendations/chart/{memberId}",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSongs(response.data.dataBody);
        // console.log(response.data.dataBody);
      } catch (error) {
        console.error("찜한 노래 목록을 가져오지 못했습니다.", error);
      }
    };

    fetchLikedSongs();
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
      <Header title="최신차트" state={["back", "search"]} />
      <div className="sing-container">
        <div className="sing-content">
          <div className="sing-chart">
            {Songs.map((song) => (
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

export default PreferenceChart;
