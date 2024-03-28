import Header from "@/components/layout/Header";
import Lyrics from "@/components/single/Lyrics";
import React from "react";
import styled from "styled-components";
import styles from "@styles/single/Single.module.scss";
import AlbumCover from "@/components/single/AlbumCover";
import Controller from "@/components/sing/Controller";

const Background = styled.div`
  height: 100vh;
  width: '100%';
  /* position: absolute; */
  /* top: 0;
  left: 0; */
  overflow: hidden;
  z-index: -1;
  /* background-image: url("https://mblogthumb-phinf.pstatic.net/MjAxOTA4MTFfMTA2/MDAxNTY1NTE2ODUyNDI4.C0IrEvRkqqKKpZHJszebfMRGK2moIn4GLkYVTKZu8V4g.b9MC4Chb1X8Lnyk2kjQ6g5Wa7PXSWt9kKbbGVRN8LGUg.PNG.azzi_01/%EC%86%8D%EC%83%81%ED%95%B4.png?type=w800");
  background-size: cover; */
  /* position: relative;
  z-index: -1;
  box-shadow:  0 0 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  filter: blur(5px);
  backdrop-filter: blur(); */
  /* filter: blur(5px); */
`;

const Single = () => {
  const audioCtx = new AudioContext()
  const gainNode = audioCtx.createGain()

  
  return (
    <div>
      {/* title, state, page */}
      {/* page 부르기 메인 페이지로 이동하게 주소 수정 */}
      <Header title="싱글 모드" state="close" page="" />
      <Background>
        <div className={styles.container}>
          <AlbumCover />
          <Lyrics />
        </div>
      </Background>
      <Controller />
    </div>
  );
};

export default Single;
