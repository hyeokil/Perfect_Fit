import React from "react";
import { useNavigate } from "react-router-dom";
import "@/styles/chart/AllChart.scss";

const AllChart: React.FC = () => {
  const navigate = useNavigate();

  // 타입 선언해서 네비게이트 한번에 관리
  const handleNavigate = (chartType: string) => {
    navigate(chartType);
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
      <div className="all-recommend">
        <h4>추천 관련 차트들</h4>
        <div className="all-recommend-border">
          <div className="recommend-chart">
            재훈이가 추천 차트 만들어 주면 쭈루룩 뿌릴 예정
            <p>dd</p>
            <p>dd</p>
            <p>ddd</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllChart;
