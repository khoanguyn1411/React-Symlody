import React, { memo } from "react";

import { usePaginationContext } from "../context";
import { PaginationDot } from "./pagination-dot";
import { PaginationItem } from "./pagination-item";

const _PaginationList: React.FC = () => {
  const { totalPages, pageStep } = usePaginationContext();
  const isPageRangeOverTotal = pageStep * 2 + 1 >= totalPages;
  return (
    <ul className="flex items-baseline">
      <PaginationFirstPage isPageRangeOverTotal={isPageRangeOverTotal} />

      {[...Array(isPageRangeOverTotal ? totalPages : pageStep * 2 + 1)].map(
        (item, index) => (
          <PaginationArray
            isPageRangeOverTotal={isPageRangeOverTotal}
            key={index}
            index={index}
          />
        )
      )}
      <PaginationLastNumber isPageRangeOverTotal={isPageRangeOverTotal} />
    </ul>
  );
};

const PaginationFirstPage = ({ isPageRangeOverTotal }) => {
  const { activePage, pageStep } = usePaginationContext();
  if (isPageRangeOverTotal) {
    return;
  }
  if (activePage > pageStep + 1) {
    if (activePage > pageStep + 2) {
      return (
        <>
          <PaginationItem pageIndex={1} />
          <PaginationDot />
        </>
      );
    }
    return <PaginationItem pageIndex={1} />;
  }
};

const PaginationLastNumber = ({ isPageRangeOverTotal }) => {
  const { activePage, totalPages, pageStep } = usePaginationContext();
  if (isPageRangeOverTotal) {
    return;
  }
  if (activePage <= totalPages - pageStep - 1) {
    if (activePage <= totalPages - pageStep - 2) {
      return (
        <>
          <PaginationDot />
          <PaginationItem pageIndex={totalPages} />
        </>
      );
    }
    return <PaginationItem pageIndex={totalPages} />;
  }
};

const PaginationArray = ({ index, isPageRangeOverTotal }) => {
  const { activePage, totalPages, pageStep } = usePaginationContext();

  if (isPageRangeOverTotal) {
    return <PaginationItem pageIndex={index + 1} />;
  }
  if (activePage <= pageStep) {
    return <PaginationItem pageIndex={index + 1} />;
  }
  if (activePage > pageStep && activePage < totalPages - pageStep) {
    return <PaginationItem pageIndex={activePage + index - pageStep} />;
  }
  if (activePage >= totalPages - pageStep) {
    return <PaginationItem pageIndex={totalPages - pageStep * 2 + index} />;
  }
};

export const PaginationList = memo(_PaginationList);
