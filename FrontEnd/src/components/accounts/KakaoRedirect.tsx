import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Loading from "../common/Loading";

const KakaoRedirect: React.FC = () => {
  const [searchParams] = useSearchParams(); // URL 파라미터 가져오기
  const navigate = useNavigate(); // 페이지 전환 함수 가져오기

  useEffect(() => {
    // URL 파라미터에서 코드 가져오기
    const code: string | null = searchParams.get("code");

    if (code) {
      // 토큰 요청 함수 호출
      getAuthToken(code);
    }
  }, []);

  // 토큰 요청 함수
  const getAuthToken = async (code: string) => {
    try {
      // 카카오 서버에 코드 전달하여 토큰 요청
      const response = await axios.get(
        `https://j10c205.p.ssafy.io/api/v1/member/kakao/login?code=${code}&prompt=login`
      );

      // 토큰 받아오기 성공 시
      const token: string = response.data.dataBody.token.accessToken;
      localStorage.setItem("accessToken", token); // 토큰을 localStorage에 저장
      document.cookie = `accessToken=${token}; path=/`; // 토큰을 쿠키에 저장
      navigate("/access");
    } catch (error) {
      console.error("토큰 요청에 실패했습니다:", error);
    }
  };

  return (
    <div>
      <Loading />
    </div>
  );
};

export default KakaoRedirect;
