import Header from "@/components/layout/Header";
import React, { useEffect, useState } from "react";
import "@/styles/chart/Singchart.scss";
import axios from "axios";
import Loading from "@/components/common/Loading";
import BottomSheet from "@/components/charts/BottomSheet";

const LatestChart: React.FC = () => {
  const [latestSongs, setLatestSongs] = useState<any[] | null>(null);
  const [selectedSong, setSelectedSong] = useState<any | null>(null);

  const openBottomSheet = (song: any) => {
    console.log(song);
    console.log("클릭 됨");
    setSelectedSong(song);
  };

  const closeBottomSheet = () => {
    setSelectedSong(null);
  };

  // 노래 조회
  useEffect(() => {
    const fetchLatestSongs = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
          "https://j10c205.p.ssafy.io/api/v1/song/chart/latest",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setLatestSongs(response.data.dataBody);
        // console.log(response.data.dataBody);
      } catch (error) {
        console.error("최신곡 못 받아옴", error);
      }
    };

    fetchLatestSongs();
  }, []);

  // 찜하기
  const toggleLike = async (song: any) => {
    try {
      const token = localStorage.getItem("accessToken");

      // 서버에 보낼 데이터 구성
      const updatedSongData = {
        ...song,
        myListDisplay: !song.myListDisplay, // 토글
      };
      // console.log(updatedSongData);

      await axios.post(
        `https://j10c205.p.ssafy.io/api/v1/myList/like/${song.songId}`, // 곡 ID에 따라 업데이트
        updatedSongData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // UI 갱신을 위해 상태 업데이트
      setLatestSongs((prevSongs) => {
        if (prevSongs) {
          return prevSongs.map((prevSong) => {
            if (prevSong.songId === song.songId) {
              return updatedSongData;
            }
            return prevSong;
          });
        }
        return null;
      });
    } catch (error) {
      console.log("토글 실패", error);
    }
  };

  if (latestSongs === null) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div>
      <Header title="최신차트" state={["back", "search"]} />
      <div className="sing-container">
        <div className="sing-content">
          <div className="sing-chart">
            {/* 최신곡 차트들 여기에 쫙 뿌리기 */}
            {latestSongs.map((song, index) => (
              <div
                key={index}
                className="sing-song"
                onClick={() => openBottomSheet(song)}
              >
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
            {/* 바텀시트 */}
            <BottomSheet
              isOpen={selectedSong !== null}
              onClose={closeBottomSheet}
            >
              {selectedSong && (
                <div>
                  {/* 선택된 노래의 정보 표시 */}
                  <h3>{selectedSong.songTitle}</h3>
                  <p>{selectedSong.artist}</p>
                  {/* 추가적인 기능 등 */}
                </div>
              )}
            </BottomSheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestChart;
