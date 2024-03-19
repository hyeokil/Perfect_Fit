// KakaoRedirect.js
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAuthToken } from '../../api/AccountApi';

const KakaoRedirect = () => {
  const [searchParams] = useSearchParams();
  
  useEffect(() => {
    const code = searchParams.get('code');
    
    if (code) {
      getAuthToken('kakao', code).then((token) => {
        // 여기에서 토큰을 처리합니다. 예를 들어 저장하거나 상태로 설정할 수 있습니다.
      }).catch((error) => {
        // 오류 처리
      });
    }
  }, [searchParams]);

  return (
    <div>
      로그인 처리 중...
    </div>
  );
};

export default KakaoRedirect;
