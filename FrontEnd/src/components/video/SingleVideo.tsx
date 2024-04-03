import { instance } from "@/api/axios";
import { SoloVideoType } from "@/types/apiType";
type SingleVideoProps = {
  video: SoloVideoType;
  setOpenVideo: React.Dispatch<React.SetStateAction<boolean>>;
};
const SingleVideo: React.FC<SingleVideoProps> = ({ video, setOpenVideo }) => {
  const { id, userPath, audioPath, songTitle, artistName, songThumbnail } = video;
  const close = () => {
    setOpenVideo(false);
  };
  const createReels = () => {
    const data = {
      songId: id,
      time: 13334,
      userPath: userPath,
      audioPath: audioPath,
    };
    instance.post(`/api/v1/reels/create`, data)
    .then(res => console.log(res))
    .catch(err => console.error(err))
  };
  return (
    <div>
      <video src={userPath} />
      <audio src={audioPath} />
      <button onClick={close}>닫기</button>
      <button onClick={createReels}>릴스 생성!</button>
    </div>
  );
};

export default SingleVideo;
