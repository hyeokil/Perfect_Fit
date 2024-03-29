import TabMenu from "@/components/charts/TabMenu";
import acoustic from "@/components/charts/genres/acoustic";
import dance from "@/components/charts/genres/dance";
import hiphop from "@/components/charts/genres/hiphop";
import jazz from "@/components/charts/genres/jazz";
import ost from "@/components/charts/genres/ost";
import pop from "@/components/charts/genres/pop";
import rnb from "@/components/charts/genres/rnb";
import rock from "@/components/charts/genres/rock";
import Header from "@/components/layout/Header";
import React from "react";



const GenreChart: React.FC = () => {
  const tabMenuItems = [
    { name: "Pop", component: pop },
    { name: "Rock", component: rock },
    { name: "힙합", component: hiphop },
    { name: "Dance", component: dance },
    { name: "Acoustic", component: acoustic },
    { name: "R&B", component: rnb },
    { name: "Jazz", component: jazz },
    { name: "OST", component: ost },
  ];

  return (
    <div>
      <Header title="장르별 차트" state={["back", "search"]} />
      <TabMenu items={tabMenuItems} localStorageKey="" />
    </div>
  );
};

export default GenreChart;
