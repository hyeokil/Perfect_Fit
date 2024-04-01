import React, { useState, useRef } from 'react';
import Header from '@/components/layout/Header';
import ReelsVideo from '@/components/reels/ReelsVideo';

const ReadReels = () => {
  const [currentReelsIndex, setCurrentReelsIndex] = useState(0); // 현재 Reels의 인덱스 상태 추가
  const reelsData = [
    {
      userPath: "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/video/%EC%9E%91%EC%9D%80+%EA%B2%83%EB%93%A4%EC%9D%84+%EC%9C%84%ED%95%9C+%EC%8B%9C(Boy+With+Luv)(Feat.Halsey)...__2024-04-01T22-38-50.708Z",
      musicPath: "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/music/%EC%9E%91%EC%9D%80+%EA%B2%83%EB%93%A4%EC%9D%84+%EC%9C%84%ED%95%9C+%EC%8B%9C(Boy+With+Luv)(Feat.Halsey)...__2024-04-01T22-38-50.708Z"
    },
    {
      userPath: "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/video/2024-04-01T20-35-33.693Z",
      musicPath: "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/music/2024-04-01T20-35-33.693Z"
    },
    // 다른 Reels들의 경로를 필요에 따라 추가할 수 있습니다
  ];

  const touchStartRef = useRef(0);

  const handleTouchStart = (e) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const touchEnd = e.changedTouches[0].clientY;
    if (touchEnd < touchStartRef.current) {
      // 스와이프 위로 이동
      setCurrentReelsIndex(prevIndex => (prevIndex + 1) % reelsData.length); // 다음 Reels의 인덱스로 변경
    }
  };

  return (
    <div>
      <Header title="릴스" state={["back", "close"]} page="mainchart" />
      <h1>릴스 조회 페이지</h1>
      <div onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd} style={{ touchAction: 'none' }}>
        {/* onTouchStart 및 onTouchEnd 이벤트를 사용하여 스와이프 동작 감지 */}
        <ReelsVideo userPath={reelsData[currentReelsIndex].userPath} musicPath={reelsData[currentReelsIndex].musicPath} index={currentReelsIndex}/>
      </div>
    </div>
  );
};

export default ReadReels;
