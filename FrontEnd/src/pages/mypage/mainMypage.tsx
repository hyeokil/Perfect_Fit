import React from "react";
import Header from "@/components/layout/Header";
import "@styles/mypage/MainMypage.scss";
import { useNavigate } from "react-router-dom";


const MainMypage: React.FC = () => {
  const navigate = useNavigate()
  const handleNavigate = (des: string) => {
    navigate(des)
  }

  return (
    <div className="main-mypage-container">
      <Header title="마이페이지" state={["back", "setting"]} />
      <div className="section my-analyze">
        <h2>분석 그래프</h2>
        <p>여기에 분석 그래프와 프로필이 함께 들어갑니다.</p>
      </div>
      <div className="section my-like" onClick={() => handleNavigate("/mylike")}>
        <h2>찜한 목록</h2>
        <p>여기에서 내가 찜한 항목을 볼 수 있습니다.</p>
      </div>
      <div className="section my-solo" onClick={() => handleNavigate("/mysolo")}>
        <h2>싱글 녹화</h2>
        <p>내 싱글 녹화를 볼 수 있는 공간입니다.</p>
      </div>
      <div className="section my-duet" onClick={() => handleNavigate("/myduet")}>
        <h2>듀엣 녹화</h2>
        <p>내 듀엣 녹화를 볼 수 있는 공간입니다.</p>
      </div>
    </div>
  );
};

export default MainMypage;
