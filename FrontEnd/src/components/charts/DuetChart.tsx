import React from "react";
import "@/styles/chart/DuetChart.scss"


const DuetChart: React.FC = () => {
  return (
    <div className="duet-container">
      <div className="duet-header">
        <img src="../../src/assets/image/chart/DuetChart.png" alt="" className="DuetChart"/>
      </div>
      <div className="duet-border">
        <div className="duet-content">
          <p>듀엣 기다리는 사람들 모임</p>
          <p>주르륵</p>
          <p>슈류륙</p>
        </div>
      </div>
    </div>
  );
};

export default DuetChart;
