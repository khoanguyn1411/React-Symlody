import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router-dom";

import { CompactSidebar } from "./compact";
import { SidebarItem } from "./sidebar-item";
import { getTabsSidebar } from "./sidebar-tab";

type TProps = {
  className?: string;
  pageKey: string;
  isCompactSidebar: boolean;
  onToggleCompactSidebar: () => void;
};

export const Sidebar: React.FC<TProps> = ({
  className,
  pageKey,
  isCompactSidebar,
  onToggleCompactSidebar,
}) => {
  const navigate = useNavigate();
  const tabsSidebar = getTabsSidebar();
  const handleSwitchTab = (path: string) => () => {
    navigate(path);
  };
  return (
    <div
      className={classNames(
        "fixed hidden border-r border-gray-200 -mt-header xl:block transition-width  duration-300",
        isCompactSidebar ? "w-sidebar-compact" : "w-sidebar",
        className
      )}
    >
      <div className={"h-screen flex flex-col items-center px-3 py-2"}>
        <div className="flex justify-start w-full">
          <div className="w-10 h-10 rounded-full bg-primary-500"></div>
        </div>
        <div className="flex-1 w-full mt-4">
          {tabsSidebar.map((tab, index) => (
            <SidebarItem
              key={index}
              tab={tab}
              isActive={pageKey === tab.pageActive}
              isCompactSidebar={isCompactSidebar}
              onClick={handleSwitchTab(tab.to)}
            />
          ))}
        </div>

        <CompactSidebar
          isCompactSidebar={isCompactSidebar}
          onSetIsCompact={onToggleCompactSidebar}
        />
      </div>
    </div>
  );
};
