import React from "react";
import Stepper from "../../components/accounts/Stepper";
import "@styles/accounts/Voicetraining.scss";

const Voicetraining: React.FC = () => {
  return (
    <div className="voicetraining-container">
      <Stepper currentStep={3} />
      <div className="voice-header">
        <h2>내 목소리 학습하기</h2>
      </div>
      <div className="voice-mic">
        <img src="././src/assets/icon/Record.png" alt="마이크1" />
        <h3>어떻게 학습 할꺼죠 히찬희찬씨찬씨?(황희찬아님)애국가?</h3>
      </div>
      <button className="voice-button">녹음시작</button>
    </div>
  );
};

export default Voicetraining;
