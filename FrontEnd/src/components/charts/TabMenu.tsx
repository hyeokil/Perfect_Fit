import React, { useEffect, useState } from "react";
import SwipeableViews from "react-swipeable-views";
import "@/styles/chart/TabMenu.scss";

interface TabMenuItem {
  name: string;
  component: React.FC;
}

interface TabMenuProps {
  items: TabMenuItem[];
  localStorageKey: string;
}

const TabMenu: React.FC<TabMenuProps> = ({ items, localStorageKey }) => {
  const [currentTab, setCurrentTab] = useState<number | null>(() => {
    const storedTab = localStorage.getItem(localStorageKey);
    return storedTab !== null ? parseInt(storedTab) : 0;
  });

  useEffect(() => {
    const storedTab = localStorage.getItem(localStorageKey);
    if (storedTab !== null) {
      setCurrentTab(parseInt(storedTab));
    }
  }, [localStorageKey]);

  const selectMenuHandler = (index: number) => {
    setCurrentTab(index);
    localStorage.setItem(localStorageKey, index.toString());
  };

  return (
    <>
      <div className="tab-menu">
        {items.map((el, index) => (
          <li
            key={index}
            className={index === currentTab ? "submenu focused" : "submenu"}
            onClick={() => selectMenuHandler(index)}
          >
            {el.name}
          </li>
        ))}
      </div>
      <SwipeableViews
        index={currentTab || 0}
        onChangeIndex={(index: number) => selectMenuHandler(index)}
      >
        {items.map((item, index) => (
          <div key={index}>{React.createElement(item.component)}</div>
        ))}
      </SwipeableViews>
    </>
  );
};

export default TabMenu;
