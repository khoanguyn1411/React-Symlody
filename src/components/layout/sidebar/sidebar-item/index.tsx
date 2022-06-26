import classNames from "classnames";
import React from "react";

import { ITabSidebar } from "../type";

type TProps = {
  tab: ITabSidebar;
  isActive: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

export const SidebarItem: React.FC<TProps> = ({ tab, isActive, onClick }) => {
  return (
    <div
      aria-hidden="true"
      onClick={onClick}
      className={classNames(
        "flex px-4 py-3 items-center cursor-pointer w-full mb-4 hover:bg-primary-50 duration-300 rounded-md font-medium transition-all group",
        isActive ? "bg-primary-50 text-primary-800" : undefined
      )}
    >
      <span className="text-left group-hover:text-primary-800 transition-all duration-300">
        <i className={tab.icon}></i>
      </span>
      <span className="ml-3 group-hover:text-primary-800 transition-all duration-300">
        {tab.title}
      </span>
    </div>
  );
};
