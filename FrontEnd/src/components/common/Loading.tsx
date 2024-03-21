import Spinner from "@/assets/image/load.gif";
import "@styles/common/Loading.scss";

const Loading = () => {
  return (
    <div className="spinner-container">
      <img src={Spinner} alt="스피너" className="spinner-img" />
    </div>
  );
};

export default Loading;
