import React from "react";

import { ITabSidebar } from "../type";

type TProps = {
  tab: ITabSidebar;
  isActive: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const SidebarItem: React.FC<TProps> = ({ tab, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`flex px-4 py-3 items-center cursor-pointer w-full mb-3 rounded-md font-semibold transition-all ${
        isActive && "bg-primary-50 font-bold text-primary-800"
      }`}
    >
      <span className="text-left min-w-[2rem]">
        <i className={tab.icon}></i>
      </span>
      {tab.title}
    </button>
  );
};
