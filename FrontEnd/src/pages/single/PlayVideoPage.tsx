import Header from '@/components/layout/Header';
import ReelsButton from '@/components/reels/createReelsbutton';
import DuetVideo from '@/components/video/DuetVideo';
<<<<<<< HEAD
=======
import SingleVideo from '@/components/video/singleVideo';
import React from 'react';
>>>>>>> fa66cb24b5de87e6f22320e212267d0955aaf89c

const PlayVideoPage = () => {
  return (
    <div>
      <Header title="비디오 재생" state={["back", "close"]} page="mainchart" />
      <DuetVideo />
      <ReelsButton />
    </div>
  );
};

export default PlayVideoPage;