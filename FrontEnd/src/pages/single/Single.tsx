import Header from "@/components/layout/Header";
import styled from "styled-components";
import styles from "@styles/single/Single.module.scss";
import AlbumCover from "@/components/single/AlbumCover";
import Controller from "@/components/sing/Controller";
import Camera from "@/components/sing/Camera";
import { MusicInfoType } from "@/types/apiType";
import Toggle from "@/components/sing/Toggle";
import { useEffect, useState } from "react";
import { VideoId } from "@/util/videoUrl";
import SaveAlert from "@/components/sing/SaveAlert";
import Lyrics from "@/components/single/Lyrics";
import NotSaveAlert from "@/components/sing/NotSaveAlert";
import { useNavigate } from "react-router-dom";
import SingRecorder from "@/components/sing/SingRecorder";
import VoiceRecord from "@/components/sing/VoiceRecord";

const Single = () => {
  // 페이지 이동 감지
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // 페이지를 나가려고 할 때 알림창 표시
      e.preventDefault();
      e.returnValue = "으아아아";
    };

    const handlePopstate = () => {
      // 뒤로가기를 누를 때 알림창 표시
      if (
        window.confirm(
          "변경사항을 저장하지 않았습니다. 정말로 이 페이지를 나가시겠습니까?"
        )
      ) {
        navigate(-1);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopstate);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopstate);
    };
  }, [navigate]);
  //---------------------------------------------------
  // 저장여부
  const [showSaveAlert, setShowSaveAlert] = useState<boolean>(false);
  const [showNoAlert, setShowNoAlert] = useState<boolean>(false);
  const [userPitch, setUserPitch] = useState<number>(1.0);
  const Background = styled.div`
    background: url("https://cdn.music-flo.com/image/album/797/591/02/04/402591797_5caffbab.jpg?1555037100496/dims/resize/500x500/quality/90");
    background-size: cover;
    background-position: center;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    position: absolute; /* 배경 이미지가 페이지에 고정되도록 설정 */
    top: 50px;
    left: 0;
    width: 100vw;
    height: 95vh;
    filter: blur(7px);
  `;
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
      <Header title="싱글 모드" state={["back", "close"]} page="mainchart" />
      <Background />
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
        <iframe
          width="90%"
          height="200px"
          src="https://www.youtube.com/embed/OvIk6BDkVE4"
        />
        {/* <Lyrics /> */}
        <div className={styles.player}>
          <div className={styles.toggle}>
            <Toggle camera={camera} setCamera={setCamera} />
          </div>
          <div className={styles.controller}>
            <Controller
              setUserPitch={setUserPitch}
              setShowNoAlert={setShowNoAlert}
              setShowSaveAlert={setShowSaveAlert}
              userPitch={userPitch}
            />
          </div>
          <div className={styles.pitch}>
            <button onClick={() => setUserPitch(1.5)}>
              <img src="/public/image/pitchbutton.png" />
              <p>안쏭맞춤!</p>
            </button>
          </div>
        </div>
      </div>
      {showSaveAlert && <SaveAlert setShowSaveAlert={setShowSaveAlert} />}
      {showNoAlert && <NotSaveAlert setShowNoAlert={setShowNoAlert} />}
      <SingRecorder />
      <VoiceRecord />
    </div>
  );
};

export default Single;
