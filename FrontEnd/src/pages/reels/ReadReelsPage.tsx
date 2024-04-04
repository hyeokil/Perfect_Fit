import { useState, useRef, useEffect } from "react";
import Header from "@/components/layout/Header";
import ReelsVideo from "@/components/reels/ReelsVideo";
import { ReelsDataType } from "@/types/apiType";
import { getReelsList } from "@/api/duetApi";
import NoReels from "@/components/reels/NoReels";

const ReadReelsPage = () => {
  const [reelsData, setReelsData] = useState<ReelsDataType[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getReelsList();
        console.log(response);
        setReelsData(response.data.recommendations);
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

  //--------------------------------------------------

  // const reelsData = [
  //   {
  //     id: 1,
  //     userPath:
  //       "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/video/%EC%9D%B8%EC%83%9D%EA%B8%B8__2024-04-03T00-17-42.428Z",
  //     audioPath:
  //       "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/music/%EC%9D%B8%EC%83%9D%EA%B8%B8__2024-04-03T00-17-42.428Z",
  //     time: 1,
  //     score: 0.4,
  //     memberNickname: "테스트 2트",
  //     songTitle: "SKYBLUE",
  //     follow: true,
  //     memberId: 2,
  //     path: "s",
  //   },
  //   {
  //     id: 1,
  //     userPath:
  //       "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/video/%EC%9E%91%EC%9D%80+%EA%B2%83%EB%93%A4%EC%9D%84+%EC%9C%84%ED%95%9C+%EC%8B%9C%28Boy+With+Luv%29%28Feat.Halsey%29...__2024-04-02T05-12-09.177Z",
  //     audioPath:
  //       "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/music/%EC%9E%91%EC%9D%80%20%EA%B2%83%EB%93%A4%EC%9D%84%20%EC%9C%84%ED%95%9C%20%EC%8B%9C%28Boy%20With%20Luv%29%28Feat.Halsey%29...__2024-04-02T05-12-09.177Z",
  //     time: 1,
  //     score: 0.4,
  //     memberNickname: "테asdf2트",
  //     songTitle: "SKYBLUE",
  //     follow: true,
  //     memberId: 2,
  //     path: "s",
  //   },
  //   {
  //     id: 1,
  //     userPath:
  //       "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/video/%EC%9E%91%EC%9D%80+%EA%B2%83%EB%93%A4%EC%9D%84+%EC%9C%84%ED%95%9C+%EC%8B%9C%28Boy+With+Luv%29%28Feat.Halsey%29...__2024-04-02T05-12-09.177Z",
  //     audioPath:
  //       "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/music/%EC%9E%91%EC%9D%80%20%EA%B2%83%EB%93%A4%EC%9D%84%20%EC%9C%84%ED%95%9C%20%EC%8B%9C%28Boy%20With%20Luv%29%28Feat.Halsey%29...__2024-04-02T05-12-09.177Z",
  //     time: 1,
  //     score: 0.4,
  //     memberNickname: "테스asg",
  //     songTitle: "SKYBLUE",
  //     follow: false,
  //     memberId: 2,
  //     path: "s",
  //   },
  //   // 다른 Reels들의 경로를 필요에 따라 추가할 수 있습니다
  // ];

  // const touchStartRef = useRef(0);

  // const handleTouchStart = (e: React.TouchEvent) => {
  //   touchStartRef.current = e.touches[0].clientY;
  // };

  // const handleTouchEnd = (e: React.TouchEvent) => {
  //   const touchEnd = e.changedTouches[0].clientY;
  //   if (touchEnd > touchStartRef.current) {
  //     // 스와이프 아래로 이동
  //     setCurrentReelsIndex((prevIndex) =>
  //       prevIndex === 0 ? reelsData.length - 1 : prevIndex - 1
  //     ); // 이전 Reels의 인덱스로 변경
  //   } else if (touchEnd < touchStartRef.current) {
  //     // 스와이프 위로 이동
  //     setCurrentReelsIndex((prevIndex) => (prevIndex + 1) % reelsData.length); // 다음 Reels의 인덱스로 변경
  //   }
  // };

  return (
    <div>
      <Header title="릴스" state={["back", "close"]} page="mainchart" />
      {reelsData.length > 0 ? (
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={`player ${swipeClass}`}
          style={{ touchAction: "none" }}
        >
          {/* 여기에 ReelsVideo 컴포넌트 렌더링 */}
          {/* onTouchStart 및 onTouchEnd 이벤트를 사용하여 스와이프 동작 감지 */}
          <ReelsVideo
            data={reelsData[currentReelsIndex]}
            userPath={reelsData[currentReelsIndex].userPath}
            musicPath={reelsData[currentReelsIndex].audioPath}
            index={currentReelsIndex}
          />
        </div>
      )
    :
    <NoReels />}
    </div>
  );
};

export default ReadReelsPage;
