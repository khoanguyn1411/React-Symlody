import classNames from "classnames";
import React, { useEffect } from "react";

import { usePaginationContext } from "../context";

type TProps = {
  pageIndex: number;
};

export const PaginationItem: React.FC<TProps> = ({ pageIndex }) => {
  const { activePage, setActivePage, onPaginationChange } =
    usePaginationContext();
  const handleChangeActivePage = () => {
    setActivePage(pageIndex);
  };

  useEffect(() => {
    if (activePage === pageIndex) {
      onPaginationChange && onPaginationChange(activePage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePage]);

  return (
    <button
      onClick={handleChangeActivePage}
      className={classNames(
        "w-10 h-10 flex items-center justify-center cursor-pointer",
        {
          "bg-primary-800 text-white font-semibold": activePage === pageIndex,
          "rounded-l-[5px]": activePage === 1,
        }
      )}
    >
      {pageIndex}
    </button>
  );
};
