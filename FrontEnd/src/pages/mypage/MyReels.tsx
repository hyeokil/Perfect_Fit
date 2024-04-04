import { useState, useRef, useEffect } from "react";
import Header from "@/components/layout/Header";
import { ReelsDataType } from "@/types/apiType";
import { getMyReelsList } from "@/api/duetApi";
import NoReels from "@/components/reels/NoReels";
import MyReelsVideo from "@/components/reels/MyReelsVideo";


const MyReels: React.FC = () => {
  const [reelsData, setReelsData] = useState<ReelsDataType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMyReelsList();
        console.log(response);
        setReelsData(response.data.dataBody);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const [currentReelsIndex, setCurrentReelsIndex] = useState<number>(0); // 현재 Reels의 인덱스 상태 추가
  const [swipeClass, setSwipeClass] = useState<string>("");
  const touchStartRef = useRef<number>(0);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEnd = e.changedTouches[0].clientY;
    if (touchEnd > touchStartRef.current) {
      // 아래로 스와이프
      setSwipeClass("swipe-down");
      setCurrentReelsIndex((prev) =>
        prev === 0 ? reelsData.length - 1 : prev - 1
      );
    } else if (touchEnd < touchStartRef.current) {
      // 위로 스와이프
      setSwipeClass("swipe-up");
      setCurrentReelsIndex((prev) => (prev + 1) % reelsData.length);
    }

    setTimeout(() => setSwipeClass(""), 500); // 애니메이션이 완료된 후 클래스 초기화
  };



  return (
    <div>
    <Header title="나의 릴스" state={["back", "close"]} page="mainmypage" />
    {reelsData.length > 0 ? (
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`player ${swipeClass}`}
        style={{ touchAction: "none" }}
      >
        {/* 여기에 ReelsVideo 컴포넌트 렌더링 */}
        {/* onTouchStart 및 onTouchEnd 이벤트를 사용하여 스와이프 동작 감지 */}
        <MyReelsVideo
          data={reelsData[currentReelsIndex]}
          userPath={reelsData[currentReelsIndex].userPath}
          musicPath={reelsData[currentReelsIndex].audioPath}
          index={currentReelsIndex}
        />
      </div>
    ) : (
      <NoReels /> // reelsData 배열이 비어 있는 경우 NoReels 컴포넌트를 렌더링
    )}
  </div>
  );
};

export default MyReels;