import useRecordStore from "@/store/useRecordStore";
import styles from "@styles/sing/SaveAlert.module.scss";
import logo from "public/image/logo.png";
import { useNavigate } from "react-router-dom";
// import { mixAudioAndVideo } from '@/util/conbine';
type PropType = {
  setShowSaveAlert: React.Dispatch<React.SetStateAction<boolean>>;
};
const SaveAlert = (props: PropType) => {
  const { musicBlob, videoBlob } = useRecordStore();
  const { setShowSaveAlert } = props;
  const setResetRecord = useRecordStore((state) => state.setResetRecord);
  const navigate = useNavigate();
  const save = () => {
    if (videoBlob && musicBlob) {
      // mixAudioAndVideo(videoBlob, musicBlob)
      navigate("/preview");

      console.log("메인");
    }
  };
  const singAgain = () => {
    console.log("메인");
    setResetRecord(false);
    setShowSaveAlert(false);
  };

  const goMain = () => {
    navigate("/mainchart");
  };
  return (
    <div>
      <div className={styles.buttonwrapper}>
        <div className={styles.guide}>
          <img src={logo} alt="logo" />
          <h4>멋진 노래를 불렀어요!</h4>
        </div>
        <button onClick={save}>부른 곡 저장하기</button>
        <button onClick={singAgain}>다시 부르기</button>
        <button onClick={goMain}>그냥 끝내기</button>
      </div>
    </div>
  );
};

export default SaveAlert;
