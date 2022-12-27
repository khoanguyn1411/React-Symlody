import styled from "@emotion/styled";
import classNames from "classnames";
import React from "react";

import { Icon } from "@/assets/icons";
import { images } from "@/assets/images";
import { APP_NAME } from "@/constants";
import { useNavigateWithTransition } from "@/hooks";

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
  const tabsSidebar = getTabsSidebar();
  const { navigate } = useNavigateWithTransition();
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
          "h-screen flex flex-col gap-8 pt-8 items-center py-2 overflow-hidden",
          {
            "px-5": !isCompactSidebar,
            "px-3": isCompactSidebar,
          }
        )}
      >
        <div
          className={classNames(
            "flex items-center w-full",
            !isCompactSidebar ? "space-x-3" : "ml-1"
          )}
        >
          <img
            src={images.Logo}
            alt="Logo App"
            width={35}
            height={35}
            className="ml-1"
          />
          <span
            className={classNames(
              "transition-opacity",
              isCompactSidebar ? "opacity-0 invisible" : "h-6"
            )}
          >
            <Icon.LogoName size="large" />
          </span>
        </div>
        <div className="flex flex-col flex-1 w-full gap-2">
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
