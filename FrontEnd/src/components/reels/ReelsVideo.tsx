import React, { useEffect, useRef } from "react";
import styles from "@styles/reels/ReelsVideo.module.scss";
const reelsItem = {
  id: 22,
  path: "www",
  time: 5119,
  score: 0.3323460473044961,
  member_nickname: "테스트 616트",
  song_title: "Home",
};

type PathType = {
  userPath: string;
  musicPath: string;
  index: number;
  data : any
};
const ReelsVideo: React.FC<PathType> = ({ userPath, musicPath, index , data}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { id, path, time, score, member_nickname, song_title } = data;
//---------------------------------------------------------------------------
//playtime 기록 ㅠㅠ??


//---------------------------------------------------------------------------
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

      <div>
        <h1>{song_title}</h1>
        <h3>{member_nickname}</h3>
      </div>
    </div>
  );
};
export default ReelsVideo;
