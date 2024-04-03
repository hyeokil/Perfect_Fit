import React, { useEffect, useState } from "react";
import axios from "axios";
import ApexCharts from "react-apexcharts";
import { Link } from "react-router-dom";

interface GenreData {
  genreName: string;
  count: number;
}

const GenreAnalyze: React.FC = () => {
  const [chartOptions, setChartOptions] = useState<any>({
    chart: {
      type: "radar",
    },
    xaxis: {
      categories: [],
    },
  });
  const [chartSeries, setChartSeries] = useState<any>([]);
  const [mostLikedGenre, setMostLikedGenre] = useState<string | null>(null);

  useEffect(() => {
    const fetchGenreData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://j10c205.p.ssafy.io/api/v1/myList/get/count",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data.dataBody;
        console.log(response.data.dataBody)
        // 장르명과 카운트를 배열로 변환
        const categories = data.map((genre: GenreData) => genre.genreName);
        const series = data.map((genre: GenreData) => genre.count);

        // 차트 데이터 설정
        setChartOptions({
          ...chartOptions,
          xaxis: {
            categories: categories,
          },
        });
        setChartSeries([
          {
            name: "장르별 좋아요 수",
            data: series,
          },
        ]);

        // 가장 많이 좋아요를 받은 장르 찾기
        const maxLikes = Math.max(...series);
        const maxLikedGenreIndex = series.indexOf(maxLikes);
        const mostLikedGenreName = categories[maxLikedGenreIndex];
        setMostLikedGenre(mostLikedGenreName);
      } catch (error) {
        console.error("장르 데이터를 불러올 수 없습니다.", error);
      }
    };

    fetchGenreData();
  }, []);

  const convertToEnglish = (koreanText: string) => {
    const genreMap: { [key: string]: string } = {
      "재즈": "jazz",
      "발라드": "ballade",
      "댄스": "dance",
      "힙합": "hiphop",
      "트로트": "trot",
      "어쿠스틱": "acoustic",
      "팝": "pop",
      "록": "rock",
      "동요": "agitation",
      "R&B": "rnb",
    };

    // 주어진 한글 문자열이 매핑되어 있으면 해당 영어 장르명을 반환, 그렇지 않으면 주어진 문자열 그대로 반환
    return genreMap[koreanText] || koreanText;
  };

  return (
    <div className="analyze-all">
      <ApexCharts
        options={chartOptions}
        series={chartSeries}
        type="radar"
        height={400}
      />
      {mostLikedGenre ? (
        <div className="analyze-ment">
          <p>
            당신의 취향은 <strong>{mostLikedGenre}</strong>!
          </p>
          <Link to={`/genre/${convertToEnglish(mostLikedGenre)}`}>
            <div className="explore">
              <button className="explore-button">더 부르러 가볼까요?</button>
            </div>
          </Link>
        </div>
      ) : (
        <div className="analyze-ment">
          <p>노래 정보가 없어요.</p>
          <p>차트에서 다양한 장르를</p>
          <p> <strong>찜</strong> 하고 와볼까요?</p>
          <Link to={`/genrechart`}>
            <div className="explore">
              <button className="explore-button">찜 하러 가기</button>
            </div>
          </Link>
        </div>
        
      )}
    </div>
  );
  
};

export default GenreAnalyze;
