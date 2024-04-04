import GenreAnalyze from "@/components/analyze/GenreAnalyze";
import Header from "@/components/layout/Header";
import React from "react";
import "@styles/analyzed/SongAnalze.scss";
// import SingerAnalyze from "@/components/analyze/SingerAnalyze";

const SongAnalze: React.FC = () => {
  return (
    <div className="analyze-all">
      <Header title="분석" state={[]} />
      <div className="analyze-genre">
        <h2>장르별 분석</h2>
        <GenreAnalyze />
      </div>
    </div>
  );
};

export default SongAnalze;
