import React from "react";
import "../../styles/accounts/Access.scss";
import Stepper from "../../components/accounts/Stepper";
import { useNavigate } from "react-router-dom";

const Access: React.FC = () => {
  const navigate = useNavigate();

  const handleAgree = () => {
    navigate("/information");
  };

  return (
    <div className="access-container">
      <Stepper currentStep={1} />
      <div className="access-header">
        <h2>앱 사용을 위해</h2>
        <h2>접근 권한을 허용해주세요</h2>
      </div>
      {/* 권한 내용들 */}
      <div className="access-content">
        <p>선택 권한</p>
        <div className="permission-item">
          <span className="icon">
            <img src="././src/assets/icon/notice.png" alt="notice" />
          </span>
          <span>알림</span>&nbsp;&nbsp;&nbsp;
          <p>알림 메시지 발송</p>
        </div>
        <div className="permission-item">
          <span className="icon">
            <img src="././src/assets/icon/camera.png" alt="camera" />
          </span>
          <span>카메라</span>
          <p>노래 중 화면 녹화</p>
        </div>
        <div className="permission-item">
          <span className="icon">
            <img src="././src/assets/icon/mic.png" alt="mic" />
          </span>
          <span>마이크</span>
          <p>음성 녹음</p>
        </div>
      </div>
      <div className="access-info">
        <p>
          선택 권한의 경우 허용하지 않아도 서비스를 사용할 수 있으나 일부 서비스
          이용이 제한될 수 있습니다.
        </p>
      </div>
      <button className="access-button" onClick={handleAgree}>
        동의 후 진행
      </button>
    </div>
  );
};

export default Access;
