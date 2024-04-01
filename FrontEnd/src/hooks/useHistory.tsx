import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';

const AlertOnNavigation: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // 페이지를 나가려고 할 때 알림창 표시
      e.preventDefault();
      e.returnValue = "으아아아";
    };

    const handlePopstate = () => {
      // 뒤로가기를 누를 때 알림창 표시
      if (
        window.confirm(
          "변경사항을 저장하지 않았습니다. 정말로 이 페이지를 나가시겠습니까?"
        )
      ) {
        navigate(-1);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [navigate]);

  return null; // 이 컴포넌트는 화면에 렌더링되지 않습니다.
};

export default AlertOnNavigation;
