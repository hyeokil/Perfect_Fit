import { getUnfinishedDuet } from "@/api/single";
import { UnFinishedDuetTyep } from "@/types/apiType";
import VideoCard from "@/components/video/VideoCard";
import React, { useEffect, useState } from "react";
import styles from "@styles/mypage/VideoPage.module.scss";
import NoVideo from "@/components/video/NoVideo";
import Header from "@/components/layout/Header";

const MyDuetComplete: React.FC = () => {
  const [duetVideoList, setDuetVideoList] = useState<UnFinishedDuetTyep[]>([]);
  useEffect(() => {
    const data = async () => {
      try {
        const res = await getUnfinishedDuet();
        console.log(res);
        setDuetVideoList(res.data.dataBody);
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, []);
  return (
    <div>
      <Header title="나의 미완성 노래" state={["back", "close"]} page="mainmypage" />
      <div className={styles.wrapper}>
        {duetVideoList.length > 0 ? (
          duetVideoList.map((duetVideo) => (
            <VideoCard key={duetVideo.id} soloVideo={duetVideo}/>
          ))
        ) : (
          <NoVideo />
        )}
      </div>
    </div>
  );
};

export default MyDuetComplete;
