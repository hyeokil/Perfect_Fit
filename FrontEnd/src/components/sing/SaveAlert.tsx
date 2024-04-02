import useRecordStore from "@/store/useRecordStore";
// import { blobToFile, uploadBlobToS3 } from "@/util/S3FileUpload";
// import { fetchBlobFromUrl } from "@/util/blob";
import styles from "@styles/sing/SaveAlert.module.scss";
import logo from "public/image/logo.png";
import { useNavigate } from "react-router-dom";
// import { mixAudioAndVideo } from '@/util/conbine';
type PropType = {
  setShowSaveAlert: React.Dispatch<React.SetStateAction<boolean>>;
};
const SaveAlert = (props: PropType) => {
  // const { musicBlob, videoBlob, musicUrl, videoUrl } = useRecordStore();
  const { setShowSaveAlert } = props;
  const navigate = useNavigate();
  const save = () => {
    navigate("/preview");

    console.log("메인");
  };
  const singAgain = () => {
    console.log("메인");
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
        <button onClick={save}>부른 곡 미리 듣기</button>
        <button onClick={singAgain}>다시 부르기</button>
        <button onClick={goMain}>그냥 끝내기</button>
      </div>
    </div>
  );
};

export default SaveAlert;
