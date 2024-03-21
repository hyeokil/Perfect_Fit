import React from "react";
import "../../styles/accounts/Stepper.scss"; // 스타일 파일을 import합니다.

interface StepperProps {
  currentStep: number;
}

const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  return (
    <div className="stepper">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`step ${currentStep === step ? "active" : ""}`}
        >
          <div
            className={`step-icon ${currentStep === step ? "active" : ""}`}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
