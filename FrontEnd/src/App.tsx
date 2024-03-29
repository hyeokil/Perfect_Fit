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
import Record from "./components/sing/Record.tsx";
import "@/api/axios.ts";
import Single from "./pages/single/Single.tsx";

import MainChart from "./pages/chart/MainChart.tsx";
import LatestChart from "./pages/chart/LatestChart.tsx";
import PopularChart from "./pages/chart/PopularChart.tsx";
import GenreChart from "./pages/chart/GenreChart.tsx";
import PreferenceChart from "./pages/chart/PreferenceChart.tsx";
import Search from "./pages/chart/Search.tsx";
import mainMypage from './pages/mypage/mainMypage';
import MainMypage from "./pages/mypage/mainMypage";

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
        {/* 로그인 상태에 따라 수정하기 // 중첩 라우팅 사용하기 */}
        <Route element={<Layout />}>
          {/* 차트 */}
          <Route path="mainchart" element={<MainChart />} />
          <Route path="latestchart" element={<LatestChart />} />
          <Route path="popularchart" element={<PopularChart />} />
          <Route path="genrechart" element={<GenreChart />} />
          <Route path="preferencechart" element={<PreferenceChart />} />
          <Route path="search" element={<Search />} />
          {/* 마이페이지 */}
          <Route path="mainmypage" element={<MainMypage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
