import Header from "@/components/layout/Header";
import React, { useEffect, useState } from "react";
import "@/styles/chart/Latestchart.scss";
import axios from "axios";
import Loading from "@/components/common/Loading";

const PopularChart: React.FC = () => {
  const [latestSongs, setLatestSongs] = useState<any[] | null>(null);

  useEffect(() => {
    const fetchLatestSongs = async () => {
      try {
        const response = await axios.get(
          "http://j10c205.p.ssafy.io:9002/api/v1/song/chart/popular?memberId=1"
        );
        setLatestSongs(response.data.dataBody);
        // console.log(response.data);
      } catch (error) {
        console.error("최신곡 못 받아옴", error);
      }
    };

    fetchLatestSongs();
  }, []);

  if (latestSongs === null) {
    return <div><Loading /></div>;
  }

  return (
    <div>
      <Header title="인기차트" state={["back", "search"]} />
      <div className="latest-container">
        <div className="latest-content">
          <div className="latest-chart">
            {/* 최신곡 차트들 여기에 쫙 뿌리기 */}
            {latestSongs.map((song, index) => (
              <div key={index} className="latest-song">
                <img src={song.songThumbnail} alt={song.songThumbnail} />
                <div className="latest-song-info">
                  <h3>{song.songTitle}</h3>
                  <p>{song.artist}</p>
                </div>
                <div className="latest-song-like">
                  <img src="././src/assets/icon/chart/likefalse.png" alt="" />
                </div>
              </div>
            ))}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularChart;
