import classNames from "classnames";
import React from "react";

import { Tooltip } from "@/components";

import { ITabSidebar } from "../type";

type TProps = {
  tab: ITabSidebar;
  isActive: boolean;
  isCompactSidebar: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const SidebarItem: React.FC<TProps> = ({
  tab,
  isActive,
  isCompactSidebar,
  onClick,
}) => {
  const children = (
    <div
      aria-hidden="true"
      onClick={onClick}
      className={classNames(
        "flex px-3 py-3 items-center mb-2 cursor-pointer hover:bg-primary-50 duration-300 rounded-md font-medium transition-all group",
        isActive ? "bg-primary-50 text-primary-800" : undefined
      )}
    >
      <tab.icon
        className={classNames(
          "group-hover:text-primary-800",
          "transition-all duration-300",
          isActive ? "text-primary-800" : "text-font-main"
        )}
      />

      <div
        className={classNames(
          "ml-3 group-hover:text-primary-800 transition-all duration-300 overflow-hidden whitespace-nowrap w-full",
          isCompactSidebar && "w-0"
        )}
      >
        <span className="flex-1">{tab.title}</span>
      </div>
    </div>
  );

  if (isCompactSidebar) {
    return <Tooltip content={tab.title}>{children}</Tooltip>;
  }

  return children;
};
