import classNames from "classnames";
import React, { memo } from "react";

import { usePaginationContext } from "../context";

type TProps = {
  pageIndex: number;
};

const _PaginationItem: React.FC<TProps> = ({ pageIndex }) => {
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
        "min-w-[32px] px-2 transition-all duration-75 hover:bg-primary-50 h-8 flex items-center justify-center cursor-pointer",
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

export const PaginationItem = memo(_PaginationItem);
