import styles from '@styles/video/NoVideo.module.scss'
const NoVideo = () => {
  return (
    <div className={styles.wrapper}>
      <img src="/image/nunmul.png" />
      <p>아직 부른 노래가 없어요~</p>
    </div>
  );
};

export default NoVideo;