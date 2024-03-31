import SongSearch from "@/components/charts/SongSearch";
import TabMenu from "@/components/charts/TabMenu";
import UserSearch from "@/components/charts/UserSearch";
import Header from "@/components/layout/Header";
import "@/styles/chart/Search.scss";
import React from "react";

const Search: React.FC = () => {
  const tabMenuItems = [
    { name: "노래검색", component: SongSearch },
    { name: "유저검색", component: UserSearch },
  ];

  return (
    <div>
      <Header title="검색" state={["close", "back"]} page="mainchart" />
      <TabMenu items={tabMenuItems} localStorageKey="searchTab" />
      
    </div>
  );
};

export default Search;
