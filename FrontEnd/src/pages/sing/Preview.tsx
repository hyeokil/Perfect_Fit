import React, { useEffect, useRef, useState } from "react";
import useRecordStore from "@/store/useRecordStore";
import AlbumCover from "@/components/single/AlbumCover";
import Header from "@/components/layout/Header";
import styles from "@styles/sing/Preview.module.scss";
import useSaveStore from "@/store/useSaveStore";
import S3Upload from "@/util/S3Upload";
import { instance } from "@/api/axios";
import { useDuetStore, useSongStore } from "@/store/useSongStore";
import { Background, Filter } from "@/components/single/Background";
import { Song } from "../../types/apiType";
import { useNavigate } from "react-router";
import axios from "axios";

const Preview: React.FC = () => {
  const navigate = useNavigate()
  const selectedSong = useSongStore((state) => state.selectedSong);
  const duetSong = useDuetStore((state) => state.duetData);
  const [albumData, setAlbumData] = useState({
    artist: '',
    songTitle: "",
    songThumbnail: "",
    songId : 0
  });
  const { videoUrl, musicUrl, voiceUrl } = useRecordStore();

  useEffect(() => {
    if (mode === ("single" || "firstDuet")&& selectedSong) {
      setAlbumData({
        artist: selectedSong?.artist,
        songTitle: selectedSong?.songTitle,
        songThumbnail: selectedSong?.songThumbnail,
        songId : selectedSong.songId
      });
    }
    else if(duetSong) {
      setAlbumData({
        artist: duetSong?.artistName,
        songTitle: duetSong?.songTitle,
        songThumbnail: duetSong?.songThumbnail,
        songId : duetSong.songId
      })
    }
  }, []);
  const basicUrl = `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMN3Drroa4Vfutn4ARik9LACvb57TO5ADHC5n5sBeTBg&s`;
  const videoPlayerRef = useRef<HTMLVideoElement>(null);
  const musicRef = useRef<HTMLAudioElement>(null);
  const voiceRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [videoPath, setVideoPath] = useState<string>("");
  const [voicePath, setVoicePath] = useState<string>("");
  const [musicPath, setMusicPath] = useState<string>("");
  console.log(`musicPath : ${musicPath}`);
  console.log(`videoPath : ${videoPath}`);
  console.log(`voicePath : ${voicePath}`);
  const { voiceBlob, musicBlob, videoBlob } = useSaveStore();

  const [save, setSaved] = useState<boolean>(false);
  console.log(save);
  //---모드 =----
  const mode = useSaveStore((state) => state.mode);
  //-------------------------------------------------------
  const togglePlayback = () => {
    const player = videoPlayerRef.current;
    const voice = voiceRef.current;
    const music = musicRef.current;
    if (player && music) {
      if (player.paused && music.paused) {
        player.play();
        music.play();
        setIsPlaying(true);
      } else {
        player.pause();
        music.pause();
        setIsPlaying(false);
      }
    } else if (voice && music) {
      if (voice.paused && music.paused) {
        voice.play();
        music.play();
        setIsPlaying(true);
      } else {
        voice.pause();
        music.pause();
        setIsPlaying(false);
      }
    }
  };

  const currentDate = new Date();
  const timestamp = currentDate.toISOString().replace(/:/g, "-");

  const handleSave = () => {
    const uploads = [];
    if (videoBlob) {
      const fileName = `video/${albumData.songTitle}__${timestamp}`;
      const videoUpload = S3Upload(videoBlob, fileName)
        .then((location) => {
          setVideoPath(location);
        })
        .catch((error) => {
          console.error("Upload failed:", error);
        });
      uploads.push(videoUpload);
    } else if (voiceBlob) {
      const fileName = `voice/${albumData.songTitle}__${timestamp}`;
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
      const fileName = `music/${albumData.songTitle}__${timestamp}`;
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
    setSaved(true);
  };

  const goMain = () => {
    navigate('/mainchart')
  }

  useEffect(() => {
    if (save === true) {
      if (mode === "single") {
        console.log(videoPath);
        const data = {
          name: `Single_userId_${albumData.songTitle}_${timestamp}`,
          userPath: videoPath || voicePath,
          audioPath: musicPath,
        };
        instance
          .post(`/api/v1/single/create/${albumData.songId}`, data)
          .then((res) => {
            console.log(res)
            instance.post(`/api/v1/song/history/${albumData.songId}`)
          });
      } else if (mode == "firstDuet") {
        const data = {
          name: `First_userId_${albumData.songTitle}_${timestamp}`,
          userPath: videoPath || voicePath,
          audioPath: musicPath,
        };
        instance.post(`/api/v1/duet/create/${albumData.songId}`, data);
      } else {
        const data = {
          name: `Second_userId_${albumData.songTitle}_${timestamp}`,
          path: videoPath,
          uploaderId: `${duetSong}`,
        };
        instance.post(`/api/v1/duet/participate/${albumData.songId}`, data);
      }
    }
  }, [save, videoPath]);

  return (
    <div>
      <Header title="다시 듣기" state={["back", "close"]} page="mainchart" />
      {selectedSong && (
        <>
          <Background imageUrl={albumData.songThumbnail || basicUrl} />
          <Filter />
          <div className={styles.box}>
            <div className={styles.cover}>
              <AlbumCover musicInfo={albumData} />
            </div>
            {videoUrl && (
              <video
                ref={videoPlayerRef}
                src={videoUrl}
                className={styles.player}
              />
            )}
            {voiceUrl && !videoUrl && <audio src={voiceUrl} ref={voiceRef} />}
            {musicUrl && <audio src={musicUrl} ref={musicRef} />}
          </div>
        </>
      )}
      <div className={styles.buttonbox}>
        <button onClick={togglePlayback}>{isPlaying ? "정지" : "재생"}</button>
        <button onClick={handleSave}>저장</button>
        <button onClick={goMain}>저장하지 않고 끝내기</button>
      </div>
    </div>
  );
};

export default Preview;
