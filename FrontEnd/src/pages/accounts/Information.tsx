// Information.tsx

import React, { useEffect, useState } from "react";
import Stepper from "@components/accounts/Stepper";
import "@styles/accounts/Information.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

const Information: React.FC = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ photo: "", nickname: "" });

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

        const { image, nickname } = response.data.dataBody;
        setProfile({ photo: image, nickname: nickname });

        // console.log(response);
        console.log(response.data.dataBody.image); // 사용자 프로필 사진
        console.log(response.data.dataBody.nickname); // 사용자 이름
      } catch (error) {
        console.error("정보를 가져올 수 없습니다", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleNext = () => {
    navigate("/voicetraining");
  };

  return (
    <div className="information-container">
      <Stepper currentStep={2} />
      <div className="information-header">
        <h2>내 정보를 확인 해 주세요.</h2>
      </div>
      <div className="information-content">
        <div className="info-photo">
          <p>프로필 사진</p>
          <img src={profile.photo} alt="프사" />
        </div>
        <p>닉네임</p>
        <div className="info-name">
          <input
            type="text"
            placeholder="3글자 이상 20글자 이하로 입력해주세요"
            value={profile.nickname}
          />
        </div>
      </div>
      <button className="information-button" onClick={handleNext}>
        확인
      </button>
    </div>
  );
};

export default Information;
