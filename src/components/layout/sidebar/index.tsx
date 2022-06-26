import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { SidebarItem } from "./sidebar-item";
import { getTabsSidebar } from "./sidebar-tab";

type TProps = {
  className?: string;
};

export const Sidebar: React.FC<TProps> = ({ className = "" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const tabsSidebar = getTabsSidebar();
  const handleSwitchTab = (path: string) => () => {
    navigate(path);
  };
  return (
    <div
      className={`w-1/5 h-screen overflow-auto min-w-[256px] flex flex-col items-center px-6 py-4 ${className}`}
    >
      <div className="w-12 h-12 rounded-full bg-primary-500"></div>
      <div className="w-full mt-8">
        {tabsSidebar.map((tab, index) => (
          <SidebarItem
            key={index}
            tab={tab}
            isActive={tab.to === location.pathname}
            onClick={handleSwitchTab(tab.to)}
          />
        ))}
      </div>
    </div>
  );
};
