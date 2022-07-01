import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";

import { SidebarItem } from "./sidebar-item";
import { getTabsSidebar } from "./sidebar-tab";

type TProps = {
  className?: string;
  pageKey: string;
};

export const Sidebar: React.FC<TProps> = ({ className, pageKey }) => {
  const navigate = useNavigate();
  const tabsSidebar = getTabsSidebar();
  const handleSwitchTab = (path: string) => () => {
    navigate(path);
  };
  return (
    <div
      className={classNames(
        "fixed hidden overflow-auto border-r border-gray-200 -mt-header xl:block w-sidebar",
        className
      )}
    >
      <div className={"h-screen flex flex-col items-center px-6 py-4"}>
        <div className="w-12 h-12 rounded-full bg-primary-500"></div>
        <div className="w-full mt-8">
          {tabsSidebar.map((tab, index) => (
            <SidebarItem
              key={index}
              tab={tab}
              isActive={pageKey === tab.pageActive}
              onClick={handleSwitchTab(tab.to)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
