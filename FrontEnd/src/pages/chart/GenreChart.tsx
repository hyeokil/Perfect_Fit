import React from "react";
import { useNavigate } from "react-router-dom";
import "@styles/chart/GenreChart.scss";
import Header from "@/components/layout/Header";

const GenreChart: React.FC = () => {
  const navigate = useNavigate();

  const handleGenreClick = (genre: string) => {
    navigate(`/genre/${genre}`);
  };

  return (
    <>
      <Header title="장르별 차트" state={["back", "close"]} page="mainchart" />
      <h2>가장 많이 부르는 장르</h2>
      <div className="genre">
        <div
          className="genre-border pop"
          onClick={() => handleGenreClick("pop")}
        >
          <h3>팝</h3>
        </div>
        <div
          className="genre-border rock"
          onClick={() => handleGenreClick("rock")}
        >
          <h3>록</h3>
        </div>
        <div
          className="genre-border hiphop"
          onClick={() => handleGenreClick("hiphop")}
        >
          <h3>힙합</h3>
        </div>
        <div
          className="genre-border acoustic"
          onClick={() => handleGenreClick("acoustic")}
        >
          <h3>어쿠스틱</h3>
        </div>
      </div>
      <h2>모두 불러보기</h2>
      <div className="genre">
        <div
          className="genre-border jazz"
          onClick={() => handleGenreClick("jazz")}
        >
          <h3>재즈</h3>
        </div>

        <div
          className="genre-border ballade"
          onClick={() => handleGenreClick("ballade")}
        >
          <h3>발라드</h3>
        </div>
        <div
          className="genre-border dance"
          onClick={() => handleGenreClick("dance")}
        >
          <h3>댄스</h3>
        </div>
        <div
          className="genre-border rnb"
          onClick={() => handleGenreClick("rnb")}
        >
          <h3>알앤비</h3>
        </div>
        <div
          className="genre-border ost"
          onClick={() => handleGenreClick("ost")}
        >
          <h3>OST</h3>
        </div>
        <div
          className="genre-border agitation"
          onClick={() => handleGenreClick("agitation")}
        >
          <h3>동요</h3>
        </div>
        <div
          className="genre-border trot"
          onClick={() => handleGenreClick("trot")}
        >
          <h3>트로트</h3>
        </div>
      </div>
    </>
  );
};

export default GenreChart;
