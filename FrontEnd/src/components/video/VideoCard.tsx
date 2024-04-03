import { useEffect, useState } from "react";
import { SoloVideoType } from "@/types/apiType";
import styles from "@styles/video/videoCard.module.scss";
import { formatDate } from "@/util/songtimes";
import SingleVideo from "./SingleVideo";
const VideoCard = ({
  // key,
  soloVideo,
}: {
  key: number;
  soloVideo: SoloVideoType;
}) => {
  const {
    songThumbnail,
    // userPath,
    // audioPath,
    songTitle,
    artistName,
    createdAt,
  } = soloVideo;
  const [openVideo, setOpenVideo] = useState<boolean>(false);
  useEffect(() => {
    setOpenVideo(false);
  }, []);
  const Date = formatDate(createdAt);
  return (
    <div>
      {/* <Background $imageUrl={songThumbnail} /> */}
      <div className={styles.card} onClick={() => setOpenVideo(true)}>
        <img src={songThumbnail} />
        <div>
          <h3>{songTitle}</h3>
          <p>{artistName}</p>
          <p>{Date}</p>
        </div>
      </div>
      {openVideo && (
        <div className={styles.modalBackground}>
          <SingleVideo video={soloVideo} setOpenVideo={setOpenVideo} />
        </div>
      )}
    </div>
  );
};

export default VideoCard;
