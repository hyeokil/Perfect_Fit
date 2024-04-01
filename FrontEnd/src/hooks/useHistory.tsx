import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const AlertOnNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // 페이지를 떠날 때 발생하는 이벤트를 감지하여 알림창을 띄웁니다.
      event.preventDefault();
      event.returnValue = '';
    };

    // 페이지를 벗어날 때 이벤트를 감지합니다.
    window.addEventListener('beforeunload', handleBeforeUnload);

    // 페이지 전환 시 확인창을 띄우고, 이동을 위해 navigate를 호출합니다.
    const handleNavigation = (event: any) => {
      // 이동 여부를 확인하기 위해 사용자에게 확인창을 띄웁니다.
      const confirmNavigation = window.confirm('이 페이지를 떠나시겠습니까?');
      if (!confirmNavigation) {
        // 사용자가 이동을 취소한 경우 현재 위치로 다시 이동합니다.
        navigate(location.pathname);
        // 이벤트를 취소하여 기본 페이지 이동을 막습니다.
        event.preventDefault();
      }
    };

    // 페이지 전환 시 이벤트를 감지하여 사용자에게 확인창을 띄웁니다.
    window.addEventListener('popstate', handleNavigation);

    // 컴포넌트가 언마운트될 때 이벤트를 정리합니다.
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handleNavigation);
    };
  }, [navigate, location.pathname]);

  return null; // 이 컴포넌트는 화면에 렌더링되지 않습니다.
};

export default AlertOnNavigation;
