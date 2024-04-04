import { getSingleVideo } from "@/api/single";
import VideoCard from "@/components/video/VideoCard";
import { SoloVideoType } from "@/types/apiType";
import React, { useEffect, useState } from "react";
import styles from "@styles/mypage/VideoPage.module.scss";
import NoVideo from "@/components/video/NoVideo";
import Header from "@/components/layout/Header";
const MySolo: React.FC = () => {
  const [soloVideoList, setSoloVideoList] = useState<SoloVideoType[]>([]);

  useEffect(() => {
    const data = async () => {
      try {
        const res = await getSingleVideo();
        console.log(res);
        setSoloVideoList(res.data.dataBody);
      } catch (err) {
        console.log(err);
      }
    };
    data();
  }, []);

  return (
    <div>
      <Header title="나의 노래" state={["back", "close"]} page="mainmypage" />
      <div className={styles.wrapper}>
        {soloVideoList.length > 0 ? (
          soloVideoList.map((soloVideo) => (
            <VideoCard key={soloVideo.id} soloVideo={soloVideo} />
          ))
        ) : (
          <NoVideo />
        )}
      </div>
    </div>
  );
};

export default MySolo;
