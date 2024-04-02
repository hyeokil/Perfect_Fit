import React, { useEffect, useRef, useState } from "react";
import useRecordStore from "@/store/useRecordStore";
import AlbumCover from "@/components/single/AlbumCover";
import Header from "@/components/layout/Header";
import { useMusicStore } from "@/store/useMusicStore";
import ReactPlayer from "react-player";
import useSaveStore from "@/store/useSaveStore";
import S3Upload from "@/util/S3Upload";
import { instance } from "@/api/axios";
// import { combineAudioAndVideo } from "@/util/conbine";

const Preview: React.FC = () => {
  const { info } = useMusicStore();
  console.log(info)
  const { videoUrl, musicUrl, voiceUrl } = useRecordStore();
  const { songId, songTitle } = info;
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoPath, setVideoPath] = useState<string>("");
  const [voicePath, setVoicePath] = useState<string>("");
  const [musicPath, setMusicPath] = useState<string>("");
  console.log(`musicPath : ${musicPath}`);
  const { voiceBlob, musicBlob, videoBlob } = useSaveStore();

  const [save, setSaved] = useState<boolean>(false);
  console.log(save)
  //---모드 =----
  const mode = useSaveStore((state) => state.mode);

  const togglePlayback = () => {
    const player = videoPlayerRef.current;
    if (player) {
      isPlaying
        ? player.getInternalPlayer().pause()
        : player.getInternalPlayer().play();
      setIsPlaying(!isPlaying);
    }
  };
  const currentDate = new Date();
  const timestamp = currentDate.toISOString().replace(/:/g, "-");

  const handleSave = () => {
    const uploads = [];
    if (videoBlob) {
      const fileName = `video/${songTitle}__${timestamp}`;
      const videoUpload = S3Upload(videoBlob, fileName)
        .then((location) => {
          console.log(location);
          setVideoPath(location);
        })
        .catch((error) => {
          console.error("Upload failed:", error);
        });
      uploads.push(videoUpload);
    } else if (voiceBlob) {
      const fileName = `voice/${songTitle}__${timestamp}`;
      const voiceUpload = S3Upload(voiceBlob, fileName)
        .then((location) => {
          console.log(location);
          setVoicePath(location);
        })
        .catch((error) => {
          console.error("Upload failed:", error);
        });
      uploads.push(voiceUpload);
    }
    if (musicBlob) {
      const fileName = `music/${songTitle}__${timestamp}`;
      const musicUpload = S3Upload(musicBlob, fileName)
        .then((location) => {
          console.log(location);
          setMusicPath(location);
        })
        .catch((error) => {
          console.error("Upload failed:", error);
        });
      uploads.push(musicUpload);
    }
    // Promise.all(uploads).then(() => {
    // });
    setSaved(true);
  };

  // useEffect(() => {
  //   setSaved(false)
  // }, [])
  useEffect(() => {
    if (save === true) {
      if (mode === "single") {
        console.log(videoPath);
        const data = {
          name: `Single_userId_${songTitle}_${timestamp}`,
          path: videoPath || voicePath
        };
        instance.post(`/api/v1/single/create/${songId}`, data).then(res => console.log(res))
      } else if (mode == "firstDuet") {
        const data = {
          name: `First_userId_${songTitle}_${timestamp}`,
          path: videoPath,
        };
        instance.post(`/api/v1/duet/create/${songId}`, data);
      } else {
        const data = {
          name: `Second_userId_${songTitle}_${timestamp}`,
          path: videoPath,
          uploaderId: `userId`,
        };
        instance.post(`/api/v1/duet/participate/${songId}`, data);
      }
    }
  }, [save,videoPath]);

  return (
    <div>
      <Header title="다시 듣기" state={["back", "close"]} page="mainchart" />
      <AlbumCover musicInfo={info} />
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
      <button onClick={handleSave}>저장</button>
    </div>
  );
};

export default Preview;
