// import logo from "@assets/image/logo.png";
import styles from '@styles/single/AlbumCover.module.scss'
import { MusicInfoType } from '@/types/apiType';
// import styled from "styled-components";



const AlbumCover = (props : {musicInfo : MusicInfoType}) => {
  const {songThumbnail, artist, songTitle} = props.musicInfo

  return (
    <div className={styles.container}>
      <img src={songThumbnail} alt="커버가 업서요!" />
      <div className={styles.info}>
        <h2>{artist}</h2>
        <h4>{songTitle}</h4>
      </div>
    </div>
  );
};

export default AlbumCover;
