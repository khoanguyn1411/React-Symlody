import classNames from "classnames";
import React, { memo } from "react";

import { Tooltip } from "@/components";

import { ITabSidebar } from "../type";

type TProps = {
  tab: ITabSidebar;
  isActive: boolean;
  isCompactSidebar: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const _SidebarItem: React.FC<TProps> = ({
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
        "flex px-3 py-3 justify-center items-center mb-4 cursor-pointer hover:bg-primary-50 duration-300 rounded-md font-medium transition-all group",
        isActive ? "bg-primary-50 text-primary-800" : undefined
      )}
    >
      <tab.icon
        className={classNames(
          "group-hover:text-primary-800 min-w-max",
          "transition-all duration-300",
          isActive ? "text-primary-800" : "text-black"
        )}
      />

      <div
        className={classNames(
          "ml-3 group-hover:text-primary-800 transition-all duration-300 overflow-hidden whitespace-nowrap w-full",
          isCompactSidebar && "w-0 ml-0"
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

export const SidebarItem = memo(_SidebarItem);
