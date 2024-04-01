import React, { useRef, useState } from "react";
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
  const { videoUrl, musicUrl, voiceUrl } = useRecordStore();
  const {songId, songTitle} = info
  const videoPlayerRef = useRef<ReactPlayer>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoPath, setVideoPath] = useState<string>('')
  const [voicePath, setVoicePath] = useState<string>('')
  const [musicPath, setMusicPath] = useState<string>('')
  const { voiceBlob, musicBlob, videoBlob } = useSaveStore();

//---모드 =----
const mode = useSaveStore(state => state.mode)


  const togglePlayback = () => {
    const player = videoPlayerRef.current;
    if (player) {
      isPlaying
        ? player.getInternalPlayer().pause()
        : player.getInternalPlayer().play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleSave = () => {
    const currentDate = new Date();
    const timestamp = currentDate.toISOString().replace(/:/g, "-");

    const uploads = []

    if (videoBlob) {
      const fileName = `video/${timestamp}_${songTitle}`;
      const videoUpload = S3Upload(videoBlob, fileName)
      .then(location => {
        console.log(location)
        setVideoPath(location)
      })
      .catch(error => {
        console.error('Upload failed:', error);
      });
      uploads.push(videoUpload)

      
    } 
    if (voiceBlob) {
      const fileName = `voice/${timestamp}_${songTitle}`;
      const voiceUpload = S3Upload(voiceBlob, fileName)
      .then(location => {
        console.log(location)
        setVoicePath(location)
      })
      .catch(error => {
        console.error('Upload failed:', error);
      });
      uploads.push(voiceUpload)
    }
    if (musicBlob) {
      const fileName = `music/${timestamp}_${songTitle}`;
      const musicUpload = S3Upload(musicBlob, fileName)
      .then(location => {
        console.log(location)
        setMusicPath(location)
      })
      .catch(error => {
        console.error('Upload failed:', error);
      });
      uploads.push(musicUpload)

    }
    Promise.all(uploads).then(() => {
      if (mode === 'single') {
        const data = {
          name : `Single_userId_${songTitle}_${timestamp}`,
          path : videoPath || voicePath
        }
        instance.post(`/api/v1/single/create/${songId}`,data)
      }
      else if (mode == 'firstDuet') {
        const data = {
          name : `First_userId_${songTitle}_${timestamp}`,
          path : videoPath
        }
        instance.post(`/api/v1/duet/create/${songId}`, data)
      }
      else {
        const data = {
          name : `Second_userId_${songTitle}_${timestamp}`,
          path : videoPath,
          uploaderId : `userId`
        }
        instance.post(`/api/v1/duet/participate/${songId}`, data)
      }
    })
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
      <button onClick={handleSave}>저장</button>
    </div>
  );
};

export default Preview;
