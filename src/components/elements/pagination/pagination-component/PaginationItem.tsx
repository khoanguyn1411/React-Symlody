import classNames from "classnames";
import React from "react";

import { usePaginationContext } from "../context";

type TProps = {
  pageIndex: number;
};

export const PaginationItem: React.FC<TProps> = ({ pageIndex }) => {
  const { activePage, setActivePage, onPaginationChange, limit } =
    usePaginationContext();
  const handleChangeActivePage = () => {
    setActivePage(pageIndex);
    onPaginationChange && onPaginationChange(pageIndex, limit);
  };

  return (
    <button
      onClick={handleChangeActivePage}
      className={classNames(
        "min-w-[32px] px-2 hover:bg-primary-50 hover:transition-colors hover:duration-200 h-8 flex items-center justify-center cursor-pointer",
        {
          "bg-primary-800 text-white hover:bg-primary-800 font-semibold":
            activePage === pageIndex,
          "rounded-l-[5px]": pageIndex === 1,
        }
      )}
    >
      {pageIndex}
    </button>
  );
};