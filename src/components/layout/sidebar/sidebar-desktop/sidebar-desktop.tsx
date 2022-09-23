import classNames from "classnames";
import React, { memo } from "react";
import { useNavigate } from "react-router-dom";

import { images } from "@/assets/images";
import { APP_NAME } from "@/constants";

import { CompactSidebar } from "../compact";
import { SidebarItem } from "../sidebar-item";
import { getTabsSidebar } from "../sidebar-tab";

type TProps = {
  className?: string;
  pageKey: string;
  isCompactSidebar: boolean;
  onToggleCompactSidebar: () => void;
};

const _SidebarDesktop: React.FC<TProps> = ({
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
        "fixed hidden border-r bg-white border-gray-200 -mt-header xl:block transition-width duration-300",
        isCompactSidebar ? "w-sidebar-compact" : "w-sidebar",
        className
      )}
    >
      <div
        className={classNames("h-screen flex flex-col items-center px-3 py-2", {
          "pr-4": !isCompactSidebar,
        })}
      >
        <div
          className={classNames(
            "flex items-center justify-center w-full mt-4 mb-3",
            !isCompactSidebar && "space-x-3"
          )}
        >
          <img src={images.Logo} alt="logo" width={40} height={40} />
          <h1
            className={classNames(
              "transition-width overflow-hidden text-xl font-medium duration-200",
              isCompactSidebar && "w-0"
            )}
          >
            {APP_NAME}
          </h1>
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

        <div className="w-full text-xs text-right text-gray-400">
          <h2>{APP_NAME} - version: 1.0</h2>
        </div>

        <CompactSidebar
          isCompactSidebar={isCompactSidebar}
          onSetIsCompact={onToggleCompactSidebar}
        />
      </div>
    </div>
  );
};

export const SidebarDesktop = memo(_SidebarDesktop);
