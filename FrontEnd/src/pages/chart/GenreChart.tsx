import TabMenu from "@/components/charts/TabMenu";
import acoustic from "@/components/charts/genres/acoustic";
import dance from "@/components/charts/genres/dance";
import hiphop from "@/components/charts/genres/hiphop";
import jazz from "@/components/charts/genres/jazz";
import ost from "@/components/charts/genres/ost";
import pop from "@/components/charts/genres/pop";
import rnb from "@/components/charts/genres/rnb";
import rock from "@/components/charts/genres/rock";
import ballade from "@/components/charts/genres/ballade";
import agitation from "@/components/charts/genres/agitation";
import trot from "@/components/charts/genres/trot";

import Header from "@/components/layout/Header";
import React from "react";

const GenreChart: React.FC = () => {
  const tabMenuItems = [
    { name: "팝", component: pop },
    { name: "락", component: rock },
    { name: "힙합", component: hiphop },
    { name: "발라드", component: ballade },
    { name: "댄스", component: dance },
    { name: "어쿠스틱", component: acoustic },
    { name: "알앤비", component: rnb },
    { name: "재즈", component: jazz },
    { name: "OST", component: ost },
    { name: "동요", component: agitation },
    { name: "트로트", component: trot },
  ];

  
  return (
    <div>
      <Header title="장르별 차트" state={["back", "search"]} />
      <TabMenu items={tabMenuItems} localStorageKey="" />
    </div>
  );
};

export default GenreChart;
