import { instance } from "@/api/axios";
import { SoloVideoType, UnFinishedDuetTyep } from "@/types/apiType";
import styles from "@styles/video/SingleVideo.module.scss";
import { useRef, useState } from "react";

type SingleVideoProps = {
  video: SoloVideoType | UnFinishedDuetTyep;
  setOpenVideo: React.Dispatch<React.SetStateAction<boolean>>;
};

const SingleVideo: React.FC<SingleVideoProps> = ({ video, setOpenVideo }) => {
  const { songId } = video;
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // 조건부 타입을 사용하여 userPath 설정
  let userPath: string | undefined;
  if ("userPath" in video) {
    userPath = video.userPath;
  } else if ("uploaderUserPath" in video) {
    userPath = video.uploaderUserPath;
  }
  let audioPath: string | undefined;
  if ("audioPath" in video) {
    audioPath = video.audioPath;
  } else if ("uploaderAudioPath" in video) {
    audioPath = video.uploaderAudioPath;
  }
  const close = () => {
    setOpenVideo(false);
  };

  const createReels = () => {
    if (!userPath) return; // userPath가 없는 경우 처리
    const data = {
      songId: songId,
      time: 13334,
      userPath: userPath,
      audioPath: audioPath,
    };
    instance
      .post(`/api/v1/reels/create`, data)
      .then(() => window.alert(`릴스가 등록되었습니다.!`))
      .catch((err) => console.error(err));
  };

  const handlePlayPause = () => {
    if (videoRef.current && audioRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        audioRef.current.pause();
      } else {
        videoRef.current.play();
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <video ref={videoRef} src={userPath} />
      <audio ref={audioRef} src={audioPath} />
      <div className={styles.buttonbox}>
        <button onClick={handlePlayPause}>
          {isPlaying ? "일시정지" : "재생"}
        </button>
        <button onClick={close}>닫기</button>
        <button onClick={createReels}>릴스 생성!</button>
      </div>
    </div>
  );
};

export default SingleVideo;
