import React from 'react';
import Stepper from '../../components/accounts/Stepper';


const Information: React.FC = () => {
  return (
    <div className="information-container">
      <Stepper currentStep={2} />
      {/* 나머지 컨텐츠 */}
    </div>
  );
};

export default Information;
