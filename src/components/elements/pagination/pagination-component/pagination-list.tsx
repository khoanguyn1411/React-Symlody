import React, { Fragment } from "react";

import { usePaginationContext } from "../context";
import { PaginationDot } from "./pagination-dot";
import { PaginationItem } from "./pagination-item";

export const PaginationList = () => {
  const { activePage, totalPages, pageStep } = usePaginationContext();
  return (
    <ul className="flex items-baseline">
      {activePage > pageStep * 2 && (
        <>
          <PaginationItem pageIndex={1} />
          <PaginationDot />
        </>
      )}
      {[...Array(pageStep * 2 + 1)].map((item, index) => (
        <Fragment key={index}>
          {activePage >= totalPages - pageStep - 1 && (
            <PaginationItem
              pageIndex={totalPages - (pageStep * 2 + 1) + index + 1}
            />
          )}
          {activePage > pageStep * 2 &&
            activePage < totalPages - pageStep - 1 && (
              <PaginationItem pageIndex={activePage - pageStep + index} />
            )}
          {activePage <= pageStep * 2 && (
            <PaginationItem pageIndex={index + 1} />
          )}
        </Fragment>
      ))}
      {activePage < totalPages - pageStep - 1 && (
        <>
          <PaginationDot />
          <PaginationItem pageIndex={totalPages} />
        </>
      )}
    </ul>
  );
};
