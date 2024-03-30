import React, { useState } from "react";
import styles from "@styles/sing/SaveAlert.module.scss";
const SaveAlert = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  return (
    <div>
      <div className={styles.buttonwrapper}>
        <p>멋진 노래를 불렀어요!</p>
        <button>부른 곡 저장하기</button>
        <button>다시 부르기</button>
        <button>그냥 끝내기</button>
      </div>
    </div>
  );
};

export default SaveAlert;
