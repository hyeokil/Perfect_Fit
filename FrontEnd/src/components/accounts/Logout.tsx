import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // 쿠키에서 토큰 가져오기
      const accessToken = Cookies.get("accessToken");
      if (!accessToken) {
        console.error("토큰이 없습니다");
        return;
      }

      // 서버에 로그아웃 요청 보내기
      await axios.post(
        "http://j10c205.p.ssafy.io:9002/api/v1/member/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`, // 토큰을 요청 헤더에 포함
          },
        }
      );

      // 쿠키 삭제
      Cookies.remove("accessToken");
      console.log("로그아웃 성공");
      navigate("/");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
    }
  };

  return (
    <div>
      <button onClick={handleLogout}>로그아웃</button>
    </div>
    
  );
};

export default Logout;
