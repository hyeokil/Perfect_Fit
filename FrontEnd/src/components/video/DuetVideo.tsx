import React, { Dispatch, SetStateAction, useEffect } from "react";
import { Background } from "../single/Background";
import { instance } from "@/api/axios";
import styles from "@styles/video/duetVideo.module.scss";
import { DuetVideoType } from "@/types/apiType";

type DuetVideoProps = {
  video: DuetVideoType;
  setOpenVideo: Dispatch<SetStateAction<boolean>>;
};

const DuetVideo: React.FC<DuetVideoProps> = ({ video, setOpenVideo }) => {
  // API 요청 (필요한 경우)
  useEffect(() => {
    setOpenVideo(false)
    instance
      .get(`/api/v1/duet/finished/myList`) // 여기서 필요한 API 경로와 데이터 처리
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // setOpenVideo 상태 업데이트 또는 다른 로직 (필요한 경우)
  }, [setOpenVideo]); // 의존성 배열에 setOpenVideo 추가

  return (
    <div className={styles.videowrapper}>
      <Background $imageUrl={video.songThumbnail} />
      <div className={styles.videocontainer}>
        {/* 예를 들어, 두 개의 비디오가 있다면 다음과 같이 렌더링합니다. */}
        <video src={video.uploaderUserPath} className={styles.leftvideo} />
        <video src={video.participantUserPath} className={styles.rightvideo} />
      </div>
    </div>
  );
};

export default DuetVideo;
