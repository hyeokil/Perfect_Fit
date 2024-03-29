import React from "react";
import "../../styles/accounts/Login.scss";
import axios from "axios";
import useAuthStore from "@/store/useAuthStore";

const Login: React.FC = () => {
  const { login } = useAuthStore();

  const handleKakaoLogin = () => {
    axios
      .get(`https://j10c205.p.ssafy.io/api/v1/member/kakao`)
      .then((res) => {
        console.log(res.data.dataBody);
        window.location.href = res.data.dataBody;
        // 로그인 성공시 zustand에 저장
        login(res.data.accessToken);
      })
      .catch((err) => console.log(err));
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
    </div>
  );
};

export default Login;
