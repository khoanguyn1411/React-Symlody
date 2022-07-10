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
        "flex items-center justify-between px-4 h-header sticky top-0 mx-0 transition-margin  duration-300  border-b border-gray-200",
        isCompactSidebar ? "xl:ml-sidebar-compact " : "xl:ml-sidebar ="
      )}
    >
      <div className="relative w-2/3 mr-5">
        <input
          className="w-full px-2 py-1 text-black bg-gray-200 outline-none rounded-md"
          placeholder="Tìm kiếm tài sản, sự kiện,..."
        />
        <span className="absolute top-0 bottom-0 flex items-center text-sm text-black cursor-pointer right-3">
          <i className="fas fa-search" />
        </span>
      </div>

      <div className="flex items-center justify-end flex-1 min-w-max">
        <span className="text-xl text-white cursor-pointer mr-7">
          <i className="fas fa-bell" />
        </span>

        <div className="flex items-center">
          <div className="mr-4 bg-green-300 rounded-full w-9 h-9"></div>
          <div className="flex flex-col">
            <div className="flex cursor-pointer">
              <h1 className="font-bold">Đặng Khánh Linh</h1>
              <span className="ml-4">
                <i className="fas fa-caret-down" />
              </span>
            </div>
            <h1 className="text-xs">Thành viên ban ABC</h1>
          </div>
        </div>
      </div>
    </header>
  );
};
