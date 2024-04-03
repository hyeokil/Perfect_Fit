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

  // const soloVideoList = [
  //   {
  //     id: 1,
  //     name: "ttest.com",
  //     userPath:
  //       "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/video/Star__2024-04-02T20-56-23.255Z",
  //     audioPath:
  //       "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/music/Star__2024-04-02T20-56-23.255Z",
  //     createdAt: "2024-04-02T11:11:46.200986",
  //     songTitle: "SKYBLUE",
  //     artistName: "호미들",
  //     songThumbnail:
  //       "https://cdn.music-flo.com/image/v2/album/733/697/22/04/422697733_65e6db72_o.jpg?1709628275596/dims/resize/500x500/quality/90",
  //   },
  //   {
  //     id: 2,
  //     name: "ttest.com",
  //     userPath:
  //       "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/video/Star__2024-04-02T20-56-23.255Z",
  //     audioPath:
  //       "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/music/Star__2024-04-02T20-56-23.255Z",
  //     createdAt: "2024-04-02T11:14:19.409543",
  //     songTitle: "Pain",
  //     artistName: "하현상",
  //     songThumbnail:
  //       "https://cdn.music-flo.com/image/v2/album/784/814/20/04/420814784_659613c2_s.jpg?1704334276534/dims/resize/500x500/quality/90",
  //   },
  // ];

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
