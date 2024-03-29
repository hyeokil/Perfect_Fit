import Header from "@/components/layout/Header";
import TabMenu from "@/components/charts/TabMenu";
import AllChart from "@/components/charts/AllChart";
import DuetChart from "@/components/charts/DuetChart";

const MainChart: React.FC = () => {
  const tabMenuItems = [
    { name: "All", component: AllChart },
    { name: "Song with me", component: DuetChart },
  ];

  return (
    <div>
      <Header title="안쏭차트" state={["search"]} page="search" />
      <div className="main-event">
        <TabMenu items={tabMenuItems} localStorageKey="mainChartTab" />
      </div>
    </div>
  );
};

export default MainChart;
