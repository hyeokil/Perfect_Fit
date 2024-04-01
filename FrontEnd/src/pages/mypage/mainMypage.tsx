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
      <Header title="마이페이지" state={["back", "setting"]} />
      <div className="section my-analyze">
        <div className="user-image">
          <img src={profile.photo} alt="" />
          <div className="user-info">
            <h3>{profile.nickname}</h3>
            <p>게시글 12 팔로워 324 팔로잉 23</p>
          </div>
        </div>
        <div className="user-graph">
          <h3>분석 그래프</h3>
          <p>여기에 분석 그래프와 프로필이 함께 들어갑니다.</p>
        </div>
      </div>

      <div className="my-song">
        <div
          className="section my-solo"
          onClick={() => handleNavigate("/mysolo")}
        >
          <h2>싱글 녹화</h2>
          <p>내 싱글 녹화를 볼 수 있는 공간입니다.</p>
        </div>
        <div
          className="section my-duet"
          onClick={() => handleNavigate("/myduet")}
        >
          <h2>듀엣 녹화</h2>
          <p>내 듀엣 녹화를 볼 수 있는 공간입니다.</p>
        </div>
      </div>
      <div
        className="section my-like"
        onClick={() => handleNavigate("/mylike")}
      >
        <h2>찜한 목록</h2>
        <p>여기에서 내가 찜한 항목을 볼 수 있습니다.</p>
      </div>
    </div>
  );
};

export default MainMypage;
