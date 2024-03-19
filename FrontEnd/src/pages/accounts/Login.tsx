import React from "react";
import "../../styles/accounts/Login.scss";

const K_REST_API_KEY = ``
const K_REDIRECT_URI = `http://j10c205.p.ssafy.io:9002/`;
const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

const Login: React.FC = () => {
  const handleKakaoLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <div className="login-container">
      <div className="logo">
        <img
          src="././src/assets/image/logo.png"
          alt="logo"
          className="logo-image"
        />
        <h2>안쏭맞춤</h2>
      </div>
      <button className="kakao-login" onClick={handleKakaoLogin}>
        <img src="././src/assets/icon/kakao.png" alt="kakao" />
        카카오 로그인
      </button>
      <button className="naver-login" >
        <img src="././src/assets/icon/naver.png" alt="naver" />
        네이버 로그인
      </button>
    </div>
  );
};

export default Login;
