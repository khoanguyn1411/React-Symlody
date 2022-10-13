import styled from "@emotion/styled";
import classNames from "classnames";
import React from "react";
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

const S4SidebarDesktop = styled.div`
  &:hover {
    #sidebar-desktop-hover,
    #sidebar-desktop-hover-btn {
      visibility: visible;
      opacity: 1;
    }
  }
`;

export const SidebarDesktop: React.FC<TProps> = ({
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
    <S4SidebarDesktop
      data-tour-id="layout__sidebar"
      id="sidebar-desktop-hover"
      className={classNames(
        "fixed hidden border-r -mt-header xl:block transition-width duration-300",
        "bg-white border-gray-200",
        isCompactSidebar ? "w-sidebar-compact" : "w-sidebar",
        className
      )}
    >
      <div
        className={classNames(
          "h-screen flex flex-col items-center px-3 py-2 overflow-auto",
          {
            "pr-4": !isCompactSidebar,
          }
        )}
      >
        <div
          className={classNames(
            "flex items-center justify-center w-full mt-4 mb-3",
            !isCompactSidebar && "space-x-3"
          )}
        >
          <img
            src={images.Logo}
            alt="logo"
            width={40}
            height={40}
            className="ml-1"
          />
          <h1
            className={classNames(
              "transition-opacity overflow-hidden text-xl font-medium duration-300",
              isCompactSidebar && "opacity-0 invisible"
            )}
          >
            {APP_NAME}
          </h1>
        </div>
        <div className="flex-1 w-full mt-4">
          {tabsSidebar.map((tab) => (
            <SidebarItem
              key={tab.pageActive}
              tab={tab}
              isActive={pageKey === tab.pageActive}
              isCompactSidebar={isCompactSidebar}
              onClick={handleSwitchTab(tab.to)}
            />
          ))}
        </div>

        <div className="w-full text-xs text-gray-400">
          {!isCompactSidebar && (
            <h1 className="text-center">{APP_NAME} - version: 1.0</h1>
          )}
          {isCompactSidebar && (
            <h1 className="text-right">{APP_NAME} - v1.0</h1>
          )}
        </div>

        <CompactSidebar
          isCompactSidebar={isCompactSidebar}
          onSetIsCompact={onToggleCompactSidebar}
        />
      </div>
    </S4SidebarDesktop>
  );
};
