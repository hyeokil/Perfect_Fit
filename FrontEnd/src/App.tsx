// App.tsx
import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from "./pages/accounts/Login.tsx";
import "./App.css";
import Access from "./pages/accounts/Access.tsx";
import Information from "./pages/accounts/Information.tsx";
import Voicetraining from "./pages/accounts/Voicetraining.tsx";
import KakaoRedirect from "./components/accounts/KakaoRedirect.tsx";
import Layout from "./layout/Layout";
import Record from "./components/record/Record.tsx";
import "@/api/axios.ts";
import Single from "./pages/single/Single.tsx";
import MainChart from "./pages/chart/MainChart.tsx";
import LatestChart from "./pages/chart/LatestChart.tsx";
import PopularChart from "./pages/chart/PopularChart.tsx";
import GenreChart from "./pages/chart/GenreChart.tsx";
import PreferenceChart from "./pages/chart/PreferenceChart.tsx";
import Search from "./pages/chart/Search.tsx";
import mainMypage from "./pages/mypage/mainMypage";
import MainMypage from "./pages/mypage/mainMypage";
import Pop from "./pages/chart/genres/pop.tsx";
import Rock from "./pages/chart/genres/rock.tsx";
import Hiphop from "./pages/chart/genres/hiphop.tsx";
import Acoustic from "./pages/chart/genres/acoustic.tsx";
import Jazz from "./pages/chart/genres/jazz.tsx";
import Ballade from "./pages/chart/genres/ballade.tsx";
import Dance from "./pages/chart/genres/dance.tsx";
import Rnb from "./pages/chart/genres/rnb.tsx";
import Ost from "./pages/chart/genres/ost.tsx";
import Agitation from "./pages/chart/genres/agitation.tsx";
import Trot from "./pages/chart/genres/trot.tsx";
import RecordRtc from "./components/sing/RecordRtc.tsx";
import Preview from "./pages/sing/Preview.tsx";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        {/* 멤버 */}
        <Route path="/member/loading/kakao" element={<KakaoRedirect />} />
        <Route path="/access" element={<Access />} />
        <Route path="/information" element={<Information />} />
        <Route path="/voicetraining" element={<Voicetraining />} />
        <Route path="/record" element={<Record />} />
        <Route path="/single" element={<Single />} />
        <Route path="/preview" element={<Preview />} />
        {/* 로그인 상태에 따라 수정하기 // 중첩 라우팅 사용하기 */}
        <Route element={<Layout />}>
          {/* 차트 */}
          <Route path="mainchart" element={<MainChart />} />
          <Route path="latestchart" element={<LatestChart />} />
          <Route path="popularchart" element={<PopularChart />} />
          <Route path="genrechart" element={<GenreChart />} />
          <Route path="preferencechart" element={<PreferenceChart />} />
          <Route path="search" element={<Search />} />
          {/* 장르별 */}
          <Route path="genre/pop" element={<Pop />} />
          <Route path="genre/rock" element={<Rock />} />
          <Route path="genre/hiphop" element={<Hiphop />} />
          <Route path="genre/acoustic" element={<Acoustic />} />
          <Route path="genre/jazz" element={<Jazz />} />
          <Route path="genre/ballad" element={<Ballade />} />
          <Route path="genre/dance" element={<Dance />} />
          <Route path="genre/rnb" element={<Rnb />} />
          <Route path="genre/ost" element={<Ost />} />
          <Route path="genre/agitation" element={<Agitation />} />
          <Route path="genre/trot" element={<Trot />} />
          {/* 마이페이지 */}
          <Route path="mainmypage" element={<MainMypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
