import React, { useEffect, useRef} from "react";
import styles from "@styles/reels/Myreelsvideo.module.scss";
import { ReelsDataType } from "@/types/apiType";

type PathType = {
  userPath: string;
  musicPath: string;
  index: number;
  data: ReelsDataType;
};
const MyReelsVideo :React.FC<PathType> = ({ userPath, musicPath, data }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { songTitle } = data;
  //---------------------------------------------------------------------------
  // playtime 기록 ㅠㅠ??
  // 재생 시간을 추적하기 위한 state



  const handlePlayVideo = () => {
    if (videoRef.current && audioRef.current) {
      if (videoRef.current.paused && audioRef.current.paused) {
        videoRef.current.play();
        audioRef.current.play();
      } else {
        videoRef.current.pause();
        audioRef.current.pause();
        videoRef.current.currentTime = 0;
        audioRef.current.currentTime = 0;
      }
    }
  };
  useEffect(() => {
    // props가 변경될 때마다 실행됩니다.
    if (videoRef.current) {
      videoRef.current.load();
    }
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [userPath, musicPath]);
  //------------------------------------------------

  //------------------------------------------------
  return (
    <div>
      <div onClick={handlePlayVideo} className={styles.player}>
        <video ref={videoRef} className={styles.video}>
          <source src={userPath} />
        </video>
        <audio ref={audioRef}>
          <source src={musicPath} />
        </audio>
      </div>
      <div className={styles.titleBox}>
        <h1>{songTitle}</h1>
        <div className={styles.user}>
          </div>
        </div>
      </div>
  );
};
export default MyReelsVideo;