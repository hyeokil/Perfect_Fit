import React, { useRef } from "react";
type PathType = {
  userPath: string;
  musicPath: string;
  index : number
};
const ReelsVideo: React.FC<PathType> = ({ userPath, musicPath, index }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

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

  return (
    <div>
      <h3>릴스 한개...</h3>
      <h4>{index}</h4>
      <div onClick={handlePlayVideo}>
        <video ref={videoRef}>
          <source src={userPath} />
        </video>
        <audio ref={audioRef}>
          <source src={musicPath} />
        </audio>
      </div>
    </div>
  );
};
export default ReelsVideo;
