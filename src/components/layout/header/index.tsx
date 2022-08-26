import classNames from "classnames";
import React from "react";

import { useAppSelector } from "@/features";

import { UserDropdown } from "./UserDropdown";

type TProps = {
  className?: string;
  isCompactSidebar: boolean;
};

export const Header: React.FC<TProps> = ({ isCompactSidebar }) => {
  const userStore = useAppSelector((state) => state.user);

  return (
    <header
      className={classNames(
        "flex items-center bg-white z-10 justify-end px-4 h-header sticky top-0 mx-0 transition-margin  duration-300  border-b border-gray-200",
        isCompactSidebar ? "xl:ml-sidebar-compact " : "xl:ml-sidebar"
      )}
    >
      <div className="flex items-center space-x-4">
        <span className="flex items-center justify-center w-6 h-6 text-sm bg-gray-200 rounded-full shadow-inner cursor-pointer hover:bg-gray-300 transition-all duration-300">
          <i className="fas fa-question" />
        </span>

        <span className="flex items-center justify-center w-6 h-6 text-sm bg-gray-200 rounded-full shadow-inner cursor-pointer transition-all duration-300 hover:bg-gray-300">
          <i className="fas fa-bell" />
        </span>

        <UserDropdown user={userStore.user} />
      </div>
    </header>
  );
};
