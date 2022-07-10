import classNames from "classnames";
import React from "react";

type TProps = {
  className?: string;
};

export const Header: React.FC<TProps> = ({ className }) => {
  return (
    <header
      className={classNames(
<<<<<<< HEAD
        "flex items-center justify-between px-default h-header sticky z-10 top-0 ml-0 xl:ml-sidebar text-white bg-primary-800",
=======
        "flex items-center justify-end px-4 h-header border-b border-gray-200 sticky top-0 ml-0 xl:ml-sidebar text-black bg-white",
>>>>>>> update/header
        className
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
