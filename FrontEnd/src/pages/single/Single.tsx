import Header from "@/components/layout/Header";
import styles from "@styles/single/Single.module.scss";
import AlbumCover from "@/components/single/AlbumCover";
import Controller from "@/components/sing/Controller";
import Camera from "@/components/sing/Camera";
import Toggle from "@/components/sing/Toggle";
import { useEffect, useState } from "react";
import SaveAlert from "@/components/sing/SaveAlert";
import NotSaveAlert from "@/components/sing/NotSaveAlert";
import VoiceRecord from "@/components/sing/VoiceRecord";
import { logOnDev } from "@/util/logging";
import AlertOnNavigation from "@/hooks/useHistory";
import useSaveStore from "@/store/useSaveStore";
import { useSongStore } from "@/store/useSongStore";
import logo from "../../../public/image/logo.png";
import { Background, Filter } from "@/components/single/Background";

const Single = () => {
  //---------------------------------------------------
  // 저장여부
  const [showSaveAlert, setShowSaveAlert] = useState<boolean>(false);
  const [showNoAlert, setShowNoAlert] = useState<boolean>(false);
  const [userPitch, setUserPitch] = useState<number>(1.0);
  // ---------------------------------------------------
  // const [camerablob, setCameraBlob] =
  // ---------------------------------------------------
  // const isPlaying = useRecordStore((state) => state.isPlaying);
  const setMode = useSaveStore((state) => state.setMode);
  const [camera, setCamera] = useState<boolean>(true);
  logOnDev(`카메라, : ${camera}`);
  const info = useSongStore((state) => state.selectedSong);
  const songThumbnail = info?.songThumbnail || logo;

  // -----------------------------------------------------Youtube-----------
  // const videoUrl = VideoId(info.songUrl);
  // const [player, setPlayer] = useState<any>(null);
  // const onReady = (event: { target: any }) => {
  //   // YouTube 플레이어가 준비되면 player 상태 업데이트
  //   setPlayer(event.target);
  // };

  // useEffect(() => {
  //   if (player) {
  //     isPlaying ? player.playVideo() : player.pauseVideo();
  //   }
  // }, [isPlaying, player]);
  // const opts = {
  //   height: "200px",
  //   width: "100%",

  //   playerVars: {
  //     autoplay: 0,
  //     mute: 1, // 자동재생 설정
  //     // 추가적인 플레이어 옵션들
  //   },
  // };
  // -----------------------------------------------------Youtube-----------

  useEffect(() => {
    setMode("single");
  }, []);

  return (
    <div>
      <AlertOnNavigation />
      <Header title="싱글 모드" state={["back", "close"]} page="mainchart" />
      <Background $imageUrl={songThumbnail} />
      <Filter />
      {info && (
        <div className={styles.content}>
          {camera ? (
            <div className={styles.albumcover}>
              <Camera />
            </div>
          ) : (
            <div className={styles.albumcover}>
              <AlbumCover musicInfo={info} />
              <VoiceRecord />
            </div>
          )}
          {/* {videoUrl && (
          <YouTube videoId={videoUrl} opts={opts} onReady={onReady} />
        )} */}
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
      )}
      {showSaveAlert && <SaveAlert setShowSaveAlert={setShowSaveAlert} />}
      {showNoAlert && <NotSaveAlert setShowNoAlert={setShowNoAlert} />}
    </div>
  );
};

export default Single;
