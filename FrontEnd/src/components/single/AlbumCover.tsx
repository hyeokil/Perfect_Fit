// import React from "react";
// import logo from "@assets/image/logo.png";
import styles from '@styles/single/AlbumCover.module.scss'
import { useMusicStore } from "@/store/singStore";
// import styled from "styled-components";



const AlbumCover = () => {
  const cover:string = useMusicStore((state) => state.albumUrl)
  const singer :string = useMusicStore((state) => state.singer)
  const title :string = useMusicStore((state) => state.title)
  return (
    <div className={styles.container}>
      {/* <img src="icons/android-chrome-192x192.png" alt="albumcover" /> */}
      <img src={cover} alt="커버가 업서요!" />
      <div className={styles.info}>
        <h2>{title}</h2>
        <h4>{singer}</h4>
      </div>
    </div>
  );
};

export default AlbumCover;
