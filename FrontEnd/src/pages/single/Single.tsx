import Header from "@/components/layout/Header";
import Lyrics from "@/components/single/Lyrics";
import styled from "styled-components";
import styles from "@styles/single/Single.module.scss";
import AlbumCover from "@/components/single/AlbumCover";
import Controller from "@/components/sing/Controller";
import Camera from "@/components/sing/Camera";
import DisplayRecord from "@/components/sing/DisplayRecord";
import { MusicInfoType } from "@/types/apiType";
import SingRecorder from "@/components/sing/SingRecorder";
import Toggle from "@/components/sing/Toggle";
import { useRef, useState } from "react";
import { VideoId } from "@/util/videoUrl";
import YouTube, { YouTubePlayer } from "react-youtube";
import SaveAlert from "@/components/sing/SaveAlert";

const Single = () => {
  const musicRef = useRef<HTMLAudioElement>(null)
  const [camera, setCamera] = useState<boolean>(true);
  const info: MusicInfoType = {
    songTitle: "Star",
    artist: "폴킴",
    genre: "발라드",
    songUrl: "https://www.youtube.com/watch?v=i9YiO08yYgg",
    songThumbnail:
      "https://cdn.music-flo.com/image/v2/album/943/280/23/04/423280943_65fa99ed_s.jpg?1710922227367/dims/resize/500x500/quality/90",
    songReleaseDate: "20240321",
    songLength: "3:22",
    myListDisplay: false,
    songView: 45929,
  };
  const videoUrl = VideoId(info.songUrl);
  console.log(videoUrl);
  return (
    <div>
      {/* title, state, page */}
      {/* page 부르기 메인 페이지로 이동하게 주소 수정 */}
      <Header title="싱글 모드" state="close" page="" />
      {/* <DisplayRecord /> */}
      {/* <SingRecorder /> */}
      <div className={styles.content}>
        {camera ? (
          <div className={styles.albumcover}>
            <Camera />
          </div>
        ) : (
          <div className={styles.albumcover}>
            <AlbumCover musicInfo={info} />
          </div>
        )}
        <Lyrics />
        {/* <YouTube videoId={videoUrl} className={styles.player} /> */}
        <div>
          <Toggle camera={camera} setCamera={setCamera} />
          <Controller />
        </div>
      </div>
      <SaveAlert />
    </div>
  );
};

export default Single;
