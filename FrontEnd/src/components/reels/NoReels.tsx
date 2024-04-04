import styles from '@styles/video/NoVideo.module.scss'

const NoReels = () => {
  return (
    <div className={styles.wrapper}>
      <img src="/image/nunmul.png" />
      <p>아직 생성된 릴스가 없어요~</p>
    </div>
  );
};
export default NoReels;