import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@/styles/chart/AllChart.scss";
import BottomSheet from "./BottomSheet";
import { useSongStore } from "@/store/useSongStore";
import Loading from "../common/Loading";

const AllChart: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<any[]>([]);
  const [ostSongs, setOstSongs] = useState<any[]>([]);
  const [currentTime, setCurrentTime] = useState<string>("");
  const setSelectedSong = useSongStore((state) => state.setSelectedSong);
  const selectedSong = useSongStore((state) => state.selectedSong);

  const openBottomSheet = (song: any) => {
    setSelectedSong(song);
  };

  const closeBottomSheet = () => {
    setSelectedSong(null);
  };

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

        const ostResponse = await axios.get(
          `https://j10c205.p.ssafy.io/api/v1/song/chart/genre/ost`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSongs(response.data.dataBody.slice(0, 3));
        console.log(response.data.dataBody)
        setOstSongs(ostResponse.data.dataBody.slice(0, 3));
      } catch (error) {
        console.error("Failed to fetch songs", error);
      } finally {
        setLoading(false)
      }
    };

    fetchSongs();

    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours().toString().padStart(2, "0");

      setCurrentTime(`${hours}:00`);
    }, 10);

    return () => clearInterval(interval);
  }, []);

  const toggleLike = async (song: any) => {
    try {
      const token = localStorage.getItem("accessToken");
      const updatedSongData = { ...song, myListDisplay: !song.myListDisplay };

      await axios.post(
        `https://j10c205.p.ssafy.io/api/v1/myList/like/${song.songId}`,
        updatedSongData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSongs((prevSongs) => {
        if (prevSongs) {
          return prevSongs.map((prevSong) =>
            prevSong.songId === song.songId ? updatedSongData : prevSong
          );
        }
        return [];
      });
    } catch (error) {
      console.log("토글 실패", error);
    }
  };

  if (loading) {
    return <Loading />
  }

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
        <BottomSheet
          isOpen={selectedSong !== null}
          onClose={closeBottomSheet}
          backgroundImageUrl={selectedSong ? selectedSong.songThumbnail : ""}
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

        <div className="sing-title">
          <h3>인기 드라마 OST</h3>
          <p onClick={() => handleNavigate("/genre/ost")}>전체 보기</p>
        </div>
        <div className="sing-content">
          <div className="sing-chart">
            {ostSongs.map((song, index) => (
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
          </div>
        </div>

        <div className="sing-title">
          <h3>{`${currentTime} 기준 많이 부르는 노래`}</h3>
          <p onClick={() => handleNavigate("/songtimerec")}>전체 보기</p>
        </div>
        <div className="sing-content">
          <div className="sing-chart">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllChart;
