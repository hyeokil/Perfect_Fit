import React from "react";
import { DuetListData } from "@/types/apiType";
import styles from "@styles/chart/DuetCard.module.scss";
type DuetCardProps = {
  duetData: DuetListData; // duetData 프로퍼티를 통해 DuetListData를 전달받음
};
const DuetCard: React.FC<DuetCardProps> = ({ duetData }) => {
  const {
    songTitle,
    artistName,
    songThumbnail,
    uploaderImage,
    uploaderNickname,
  } = duetData;
  return (
    <div className={styles.box}>
      <img src={songThumbnail} alt="" className={styles.thumbnail} />
      <div>
        <div className={styles.textbox}>
          <h3>{songTitle}</h3>
          <p>{artistName}</p>
        </div>
        <div className={styles.userbox}>
          <img src={uploaderImage || songThumbnail} alt="" />
          <p>{uploaderNickname}</p>
        </div>
      </div>
    </div>
  );
};

export default DuetCard;
