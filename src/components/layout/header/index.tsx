import classNames from "classnames";
import React from "react";

type TProps = {
  className?: string;
};

export const Header: React.FC<TProps> = ({ className }) => {
  return (
    <header
      className={classNames(
        "flex items-center justify-between px-4 h-header sticky top-0 ml-0 xl:ml-sidebar text-white bg-primary-800",
        className
      )}
    >
      <div className="relative w-2/3 mr-5">
        <input
          className="w-full px-2 py-1 text-black outline-none rounded-md"
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
