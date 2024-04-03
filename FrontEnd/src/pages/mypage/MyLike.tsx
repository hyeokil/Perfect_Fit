import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import axios from "axios";
import { useSongStore } from "@/store/useSongStore";
import BottomSheet from "@/components/charts/BottomSheet";

const MyLike: React.FC = () => {
  const [likedSongs, setLikedSongs] = useState<any[]>([]);
  const setSelectedSong = useSongStore((state) => state.setSelectedSong);
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
          "https://j10c205.p.ssafy.io/api/v1/myList/get",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLikedSongs(response.data.dataBody);
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

      setLikedSongs((prevSongs) => {
        if (prevSongs) {
          // 새로운 배열 생성하여 좋아요가 취소된 노래를 제외한 나머지 노래들로 설정
          return prevSongs.filter((prevSong) => prevSong.songId !== song.songId);
        }
        return [];
      });
    } catch (error) {
      console.error("토글 실패", error);
    }
  };

  return (
    <div>
      <Header title="찜한 목록" state={["back"]} />
      <div className="sing-container">
        <div className="sing-content">
          <div className="sing-chart">
            {likedSongs.map((song) => (
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

export default MyLike;
