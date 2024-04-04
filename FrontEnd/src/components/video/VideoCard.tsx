import { useEffect, useState } from "react";
import {
  DuetVideoType,
  SoloVideoType,
  UnFinishedDuetTyep,
} from "@/types/apiType";
import styles from "@styles/video/videoCard.module.scss";
import { formatDate } from "@/util/songtimes";
import SingleVideo from "./SingleVideo";
import DuetVideo from "./DuetVideo";

type VideoType = SoloVideoType | UnFinishedDuetTyep | DuetVideoType;

const VideoCard: React.FC<{ soloVideo: VideoType }> = ({ soloVideo }) => {
  const {
    songThumbnail,
    songTitle,
    artistName,
    createdAt,
  } = soloVideo;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const isDuetVideo = (video: VideoType): video is DuetVideoType => {
    // DuetVideoType을 확인하는 논리
    return "특정 속성" in video;
  };

  useEffect(() => {
    setOpenModal(false);
  }, []);

  const handleCardClick = () => {
    setOpenModal(true);
  };

  const Date = formatDate(createdAt);

  return (
    <div>
      <div className={styles.card} onClick={handleCardClick}>
        <img src={songThumbnail} alt="Song Thumbnail" />
        <div>
          <h3>{songTitle}</h3>
          <p>{artistName}</p>
          <p>{Date}</p>
        </div>
      </div>
      {openModal && (
        <div className={styles.modalBackground}>
          <div className={styles.singleVideoModal}>
            {isDuetVideo(soloVideo) ? (
              <DuetVideo
                video={soloVideo as DuetVideoType}
                setOpenVideo={setOpenModal}
              />
            ) : (
              <SingleVideo
                video={soloVideo as SoloVideoType | UnFinishedDuetTyep}
                setOpenVideo={setOpenModal}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoCard;
