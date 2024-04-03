import React, { useEffect, useRef, useState } from "react";
import styles from "@styles/reels/ReelsVideo.module.scss";
import { ReelsDataType } from "@/types/apiType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserMinus, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { handlefollow } from "./../../api/reelsApi";

type PathType = {
  userPath: string;
  musicPath: string;
  index: number;
  data: ReelsDataType;
};
const ReelsVideo: React.FC<PathType> = ({ userPath, musicPath, data }) => {
  const { follow, memberId } = data;
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const { memberNickname, songTitle } = data;
  //---------------------------------------------------------------------------
  // playtime 기록 ㅠㅠ??
  // 재생 시간을 추적하기 위한 state
  const [playTime, setPlayTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const handleTimeUpdate = () => {
      if (video) {
        setPlayTime(video.currentTime);
      }
    };

    if (video) {
      video.addEventListener("timeupdate", handleTimeUpdate);
    }

    return () => {
      if (video) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };
  }, []);

  useEffect(() => {
    if (isPlaying && playTime >= 5) {
      console.log(`재생 시간 기록: ${playTime}초`);
      // 여기에서 재생 시간을 서버에 보내거나 상태를 업데이트 할 수 있습니다.
    }
  }, [playTime, isPlaying]);
  //---------------------------------------------------------------------------
  const handlePlayVideo = () => {
    if (videoRef.current && audioRef.current) {
      if (videoRef.current.paused && audioRef.current.paused) {
        videoRef.current.play();
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        audioRef.current.pause();
        videoRef.current.currentTime = 0;
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
        setPlayTime(0);
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
  const goUnfollow = async () => {
    try {
      const response = await handlefollow(memberId);
      // 여기에 follow 요청 후 처리할 로직을 추가하세요
      console.log("요청 성공:", response);
    } catch (error) {
      console.error("요청 실패:", error);
    }
  };

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
          <h3>{memberNickname}</h3>
          <div onClick={goUnfollow}>
            {follow ? (
              <FontAwesomeIcon
                icon={faUserMinus}
                size="2xl"
                style={{ color: "#74C0FC" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faUserPlus}
                size="2xl"
                style={{ color: "#74C0FC" }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ReelsVideo;
