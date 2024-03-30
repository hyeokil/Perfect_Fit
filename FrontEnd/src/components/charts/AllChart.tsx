import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@/styles/chart/AllChart.scss";
import BottomSheet from "./BottomSheet";

const AllChart: React.FC = () => {
  const navigate = useNavigate();
  const [songs, setSongs] = useState<any[]>([]); // songs의 타입을 any[]로 수정
  const [currentTime, setCurrentTime] = useState<string>("");
  const [selectedSong, setSelectedSong] = useState<any | null>(null);

  const openBottomSheet = (song: any) => {
    console.log(song);
    setSelectedSong(song);
  };

  const closeBottomSheet = () => {
    setSelectedSong(null);
  };

  // 타입 선언해서 네비게이트 한번에 관리
  const handleNavigate = (chartType: string) => {
    navigate(chartType);
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
        setSongs(response.data.dataBody.slice(0, 3)); // 받아온 데이터를 최대 3개로 슬라이스하여 저장합니다.
        console.log(response.data.dataBody);
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
    }, 1000); // 매 초마다 현재 시간 업데이트

    // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 setInterval을 정리
    return () => clearInterval(interval);
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
      console.log("토글 실패", error);
    }
  };

  return (
    <div className="all-container">
      <div className="all-header">
        <img
          src="../../src/assets/image/chart/AllChart.png"
          className="AllChart"
        />
      </div>
      <div className="all-category">
        <div onClick={() => handleNavigate("/latestchart")}>
          <img src="../../src/assets/icon/chart/image 22.png" />
          <h4>최신차트</h4>
        </div>
        <div onClick={() => handleNavigate("/popularchart")}>
          <img src="../../src/assets/icon/chart/image 23.png" />
          <h4>인기차트</h4>
        </div>
        <div onClick={() => handleNavigate("/genrechart")}>
          <img src="../../src/assets/icon/chart/image 24.png" />
          <h4>장르별</h4>
        </div>
        <div onClick={() => handleNavigate("/preferencechart")}>
          <img src="../../src/assets/icon/chart/image 26.png" />
          <h4>취향추천</h4>
        </div>
      </div>
      <div className="sing-container">
        <h3>{`${currentTime} 기준 사람들이 많이 부르는 노래`}</h3>
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
                      src="/src/assets/icon/chart/liketrue.png"
                      alt="좋아요"
                    />
                  ) : (
                    <img
                      src="/src/assets/icon/chart/likefalse.png"
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
              backgroundImageUrl={selectedSong && selectedSong.songThumbnail} // 배경 이미지 URL을 전달
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
              <div className="song-button">
                <button>솔로 모드</button>
                <button>듀엣 모드</button>
              </div>
            </BottomSheet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllChart;
