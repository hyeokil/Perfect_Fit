import React, { useEffect, useRef, useState } from "react";
import styles from "@styles/reels/ReelsVideo.module.scss";
import { ReelsDataType } from "@/types/apiType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { handlefollow } from "./../../api/reelsApi";

type PathType = {
  userPath: string;
  musicPath: string;
  index: number;
  data: ReelsDataType;
  // userId: string; // 문자열로 변경된 userId prop
};

const ReelsVideo: React.FC<PathType> = ({
  userPath,
  musicPath,
  data,
}) => {
  const { follow, memberId } = data;
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const userId = localStorage.getItem('userId') || '0'

  const { memberNickname, songTitle } = data;

  const [playTime, setPlayTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [state, setState] = useState(follow);

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
    setState(follow);
  }, [follow]);

  useEffect(() => {
    if (isPlaying && playTime >= 5) {
      console.log(`재생 시간 기록: ${playTime}초`);
    }
  }, [playTime, isPlaying]);

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
  console.log(memberId, userId)
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [userPath, musicPath]);

  const goUnfollow = async () => {
    try {
      const response = await handlefollow(memberId);
      setState(!state);
      console.log("요청 성공:", response);
    } catch (error) {
      console.error("요청 실패:", error);
    }
  };

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
          {parseInt(userId) !== memberId && ( // userId를 숫자로 변환하여 비교
            <div onClick={goUnfollow}>
              {state ? (
                <FontAwesomeIcon
                  icon={faStar}
                  size="2xl"
                  style={{ color: "#74C0FC" }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faStar}
                  size="2xl"
                  style={{ color: "#FFFFF" }}
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReelsVideo;
