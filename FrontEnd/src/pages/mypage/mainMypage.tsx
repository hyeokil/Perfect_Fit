import Header from '@/components/layout/Header';
import React from 'react';

const MainMypage: React.FC = () => {
  return (
    <div>
      <Header title='피드' state={["back", "setting"]}/>
    </div>
  );
};

export default MainMypage;