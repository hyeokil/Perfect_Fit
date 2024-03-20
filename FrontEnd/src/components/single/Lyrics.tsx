import React from "react";
import styles from "@styles/single/Lyrics.module.scss";

const Lyrics = () => {
  return (
    <div  className={styles.lyricsbox}>
      <div>
        <p className={styles.lyrics}>가사가사</p>
        <p className={styles.lyrics}>가사가사</p>
        <p className={styles.lyrics}>가사가사</p>
      </div>
    </div>
  );
};

export default Lyrics;
