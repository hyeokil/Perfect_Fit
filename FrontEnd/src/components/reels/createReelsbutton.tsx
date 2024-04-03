import { createReels } from "@/api/reelsApi";
const data = {
  songId: 28062,
  time: 13334,
  userPath: "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/video/%EC%9E%91%EC%9D%80+%EA%B2%83%EB%93%A4%EC%9D%84+%EC%9C%84%ED%95%9C+%EC%8B%9C(Boy+With+Luv)(Feat.Halsey)...__2024-04-02T05-12-09.177Z",
  audioPath: "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/music/%EC%9E%91%EC%9D%80+%EA%B2%83%EB%93%A4%EC%9D%84+%EC%9C%84%ED%95%9C+%EC%8B%9C(Boy+With+Luv)(Feat.Halsey)...__2024-04-02T05-12-09.177Z",
};
const ReelsButton = () => {
  const handleClick = () => {
    createReels(data);
  };
  return (
    <div>
      <button onClick={handleClick}>릴스 만들기!</button>
    </div>
  );
};

export default ReelsButton;
