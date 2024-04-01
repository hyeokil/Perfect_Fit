import React, { useRef, useState } from "react";
import useRecordStore from "@/store/useRecordStore";
import AlbumCover from "@/components/single/AlbumCover";
import Header from "@/components/layout/Header";
import { useMusicStore } from "@/store/useMusicStore";
import ReactPlayer from 'react-player';

const Preview: React.FC = () => {
  const { info } = useMusicStore();
  const { videoUrl, musicUrl, voiceUrl } = useRecordStore();

  const videoPlayerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const togglePlayback = () => {
    const player = videoPlayerRef.current;
    if (player) {
      isPlaying ? player.getInternalPlayer().pause() : player.getInternalPlayer().play();
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div>
      <Header title="다시 듣기" state={["back", "close"]} page="mainchart" />
      {videoUrl && musicUrl ? (
        <>
          <ReactPlayer
            ref={videoPlayerRef}
            url={videoUrl}
            playing={isPlaying}
            controls={true}
            width="100%"
            height="auto"
          />
          <audio src={musicUrl} controls />
        </>
      ) : (
        <>
          <AlbumCover musicInfo={info} />
          <ReactPlayer
            ref={videoPlayerRef}
            url={voiceUrl}
            playing={isPlaying}
            controls={true}
            width="100%"
            height="auto"
          />
          <audio src={musicUrl} controls />
        </>
      )}
      <button onClick={togglePlayback}>{isPlaying ? "Pause" : "Play"}</button>
    </div>
  );
};

export default Preview;
