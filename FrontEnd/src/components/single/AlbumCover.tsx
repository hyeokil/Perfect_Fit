// import logo from "@assets/image/logo.png";
import styles from '@styles/single/AlbumCover.module.scss'
import type { AlbumCover } from '@/types/proptypse';



const AlbumCover = (props : {musicInfo : AlbumCover}) => {
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
