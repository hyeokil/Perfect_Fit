import React, { useEffect, useState } from "react";
import Header from "@/components/layout/Header";
import "@styles/mypage/MainMypage.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const MainMypage: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (des: string) => {
    navigate(des);
  };

  const [profile, setProfile] = useState({
    photo: "",
    nickname: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        // 카카오 토큰 가져오기
        const accessToken = Cookies.get("accessToken");
        if (!accessToken) {
          console.error("토큰이 없습니다");
          return;
        }

        // 카카오 사용자 정보 요청
        const response = await axios.get(
          "https://j10c205.p.ssafy.io/api/v1/member/get",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // 가져온 토큰을 헤더에 포함
            },
          }
        );

        const { image, nickname, email } = response.data.dataBody;
        setProfile({ photo: image, nickname: nickname, email: email });
      } catch (error) {
        console.error("정보를 가져올 수 없습니다", error);
      }
    };
    fetchUserInfo();
  }, []);

  return (
    <div className="main-mypage-container">
      <Header title="마이페이지" state={[]} />
      <div className="section my-analyze">
        <h2>회원 정보 </h2>
        <div className="user-border">
          <div className="user-image">
            <img src={profile.photo} alt="" />
            <div className="user-info">
              <h3>{profile.nickname}</h3>
              <p>{profile.email}</p>
            </div>
          </div>
        </div>
        <div
          className="section my-like"
          onClick={() => handleNavigate("/mylike")}
        >
          <h3>찜한 목록</h3>
        </div>
      </div>
      <div className="section my-list">
        <h2>마이보관함 🇰🇷</h2>
        <div className="my-song">
          <div
            className="section my-solo"
            onClick={() => handleNavigate("/mysolo")}
          >
            <h3>싱글</h3>
          </div>
          <div className="duet-song">
            <div
              className="section my-duet"
              onClick={() => handleNavigate("/myduet")}
            >
              <h3>듀엣 포스팅</h3>
            </div>
            <div
              className="section my-duet"
              onClick={() => handleNavigate("/myduet")}
            >
              <h3>듀엣 완성</h3>
            </div>
          </div>
        </div>
        <div
          className="section my-reels"
          onClick={() => handleNavigate("/myreels")}
        >
          <h3>릴스</h3>
        </div>
      </div>
    </div>
  );
};

export default MainMypage;
