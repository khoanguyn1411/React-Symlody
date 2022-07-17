import classNames from "classnames";
import React from "react";

type TProps = {
  className?: string;
  isCompactSidebar: boolean;
};

export const Header: React.FC<TProps> = ({ isCompactSidebar }) => {
  return (
    <header
      className={classNames(
        "flex items-center bg-white z-10 justify-end px-4 h-header sticky top-0 mx-0 transition-margin  duration-300  border-b border-gray-200",
        isCompactSidebar ? "xl:ml-sidebar-compact " : "xl:ml-sidebar"
      )}
    >
      <div className="relative w-full mr-6 xl:w-1/3 min-w-max transition-all">
        <input
          className="w-full py-1 pl-2 pr-8 text-sm text-black border border-black outline-none rounded-md"
          placeholder="Tìm kiếm tài sản, sự kiện,..."
        />
        <span className="absolute top-0 bottom-0 flex items-center text-sm text-black cursor-pointer right-3">
          <i className="fas fa-search" />
        </span>
      </div>
      <span className="text-2xl cursor-pointer">
        <i className="fas fa-question-circle"></i>
      </span>

      <span className="mx-6 text-2xl cursor-pointer">
        <i className="fas fa-bell" />
      </span>

      <div className="flex items-center cursor-pointer">
        <div className="w-8 h-8 mr-3 bg-green-300 rounded-full" />
        <span className="text-xl">
          <i className="fas fa-caret-down" />
        </span>
      </div>
    </header>
  );
};
