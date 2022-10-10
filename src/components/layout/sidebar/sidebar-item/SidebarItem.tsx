import classNames from "classnames";
import React from "react";

import { Tooltip } from "../../../elements";
import { ITabSidebar } from "../type";

type TProps = {
  tab: ITabSidebar;
  isActive: boolean;
  isCompactSidebar?: boolean;
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
        "flex px-3 py-3 items-center mb-4 cursor-pointer hover:bg-primary-50 duration-300 rounded-md font-medium transition-all group",
        isActive ? "bg-primary-50 text-primary-800" : undefined,
        !isCompactSidebar ? "justify-center" : undefined
      )}
    >
      <tab.icon
        className={classNames(
          "group-hover:text-primary-800 min-w-max w-10 justify-center flex",
          "transition-all duration-300",
          isActive ? "text-primary-800" : "text-gray-400"
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
    return (
      <Tooltip placement="top-left" content={tab.title}>
        {children}
      </Tooltip>
    );
  }

  return children;
};
