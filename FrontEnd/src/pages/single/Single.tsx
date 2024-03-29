import Header from "@/components/layout/Header";
import Lyrics from "@/components/single/Lyrics";
import styled from "styled-components";
import styles from "@styles/single/Single.module.scss";
import AlbumCover from "@/components/single/AlbumCover";
import Controller from "@/components/sing/Controller";
import Camera from "@/components/sing/Camera";
import DisplayRecord from "@/components/sing/DisplayRecord";

const Background = styled.div`
  height: fit-content;
  width: "100%";
  position: relative;
  overflow: hidden;
  z-index: -999;
  background-image: url("https://cdn.music-flo.com/image/v2/album/714/417/05/04/405417714_5fb63783_s.jpg?1605777283588/dims/resize/500x500/quality/90");
  background-size: cover;
  background-position: center;
`;
const Filter = styled.div`
  position: absolute;
  left: 0.56%;
  right: -0.56%;
  top: 11.88%;
  bottom: 0.38%;

  background: rgba(191, 191, 191, 0.05);
  backdrop-filter: blur(10px);
`;
const ContentWrapper = styled.div`
  position: relative;
  z-index: 1; /* 배경 이미지 위로 올리기 */
`;


const Single = () => {
  const info: MusicInfoType = {
    songTitle: "Life Goes On",
    artist: "방탄소년단",
    genre: "힙합",
    songUrl: "www.youtube.com/watch?v=cMqfPYCQXTY",
    songThumbnail:
      "https://cdn.music-flo.com/image/v2/album/714/417/05/04/405417714_5fb63783_s.jpg?1605777283588/dims/resize/500x500/quality/90",
    songReleaseDate: "20201120",
    songLength: "3:28",
    myListDisplay: false,
    songView: 536458370,
  };
  return (
    <div>
      {/* title, state, page */}
      {/* page 부르기 메인 페이지로 이동하게 주소 수정 */}
      <Header title="싱글 모드" state="close" page="" />
      <DisplayRecord />
      <Background>
        {/* <Filter></Filter> */}
        <ContentWrapper>
          <Camera />
          <div className={styles.container}>
            <AlbumCover musicInfo={info} />
            <Lyrics />
          </div>
        </ContentWrapper>
        <Controller />
      </Background>
    </div>
  );
};

export default Single;
