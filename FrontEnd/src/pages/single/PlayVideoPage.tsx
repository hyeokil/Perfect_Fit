import Header from '@/components/layout/Header';
import ReelsButton from '@/components/reels/createReelsbutton';
import DuetVideo from '@/components/video/DuetVideo';

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