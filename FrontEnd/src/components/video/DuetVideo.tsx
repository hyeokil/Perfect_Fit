import { useEffect } from "react";
import { Background } from "../single/Background";
import { instance } from "@/api/axios";
import styles from "@styles/video/duetVideo.module.scss";
const url = `https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/video/%EC%9E%91%EC%9D%80+%EA%B2%83%EB%93%A4%EC%9D%84+%EC%9C%84%ED%95%9C+%EC%8B%9C(Boy+With+Luv)(Feat.Halsey)...__2024-04-02T05-12-09.177Z`
const dataBody = {
  id: 3,
  name: "ttest.com",
  userPath:
    "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/video/Star__2024-04-02T20-56-23.255Z",
  audioPath:
    "https://perfectfitssafy.s3.ap-northeast-2.amazonaws.com/music/Star__2024-04-02T20-56-23.255Z",
  createdAt: "2024-04-02T11:15:51.465526",
  songTitle: "SKYBLUE",
  artistName: "호미들",
  songThumbnail:
    "https://cdn.music-flo.com/image/v2/album/733/697/22/04/422697733_65e6db72_o.jpg?1709628275596/dims/resize/500x500/quality/90",
};
const DuetVideo = () => {
  useEffect(() => {
    instance
      .get(`/api/v1/single/list`)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className={styles.videowrapper}>
      <Background $imageUrl={dataBody.songThumbnail} />
      <div className={styles.videocontainer}>
        <video src={dataBody.userPath} className={styles.leftvideo} />
        <video src={url} className={styles.rightvideo} />
      </div>
    </div>
  );
};

export default DuetVideo;
