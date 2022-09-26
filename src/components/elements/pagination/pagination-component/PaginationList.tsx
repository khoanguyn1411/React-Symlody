import React, { memo } from "react";

import { usePaginationContext } from "../context";
import { PaginationDot } from "./PaginationDot";
import { PaginationItem } from "./PaginationItem";

type TProps = {
  isPageRangeOverTotal: boolean;
};

const _PaginationList: React.FC = () => {
  const { totalPages, pageStep, activePage } = usePaginationContext();
  const isPageRangeOverTotal = pageStep * 2 + 1 >= totalPages;
  return (
    <ul className="flex items-baseline">
      <PaginationFirstPage isPageRangeOverTotal={isPageRangeOverTotal} />

      {[...Array(isPageRangeOverTotal ? totalPages : pageStep * 2 + 1)].map(
        (item, index) => {
          if (activePage <= pageStep || isPageRangeOverTotal) {
            return <PaginationItem key={index} pageIndex={index + 1} />;
          }
          if (activePage > pageStep && activePage < totalPages - pageStep) {
            return (
              <PaginationItem
                key={index}
                pageIndex={activePage + index - pageStep}
              />
            );
          }
          if (activePage >= totalPages - pageStep) {
            return (
              <PaginationItem
                key={index}
                pageIndex={totalPages - pageStep * 2 + index}
              />
            );
          }
        }
      )}
      <PaginationLastNumber isPageRangeOverTotal={isPageRangeOverTotal} />
    </ul>
  );
};

const PaginationFirstPage: React.FC<TProps> = ({ isPageRangeOverTotal }) => {
  const { activePage, pageStep, totalPages } = usePaginationContext();
  if (isPageRangeOverTotal) {
    return;
  }
  if (activePage > pageStep + 1) {
    if (activePage > pageStep + 2 && totalPages - 2 * pageStep !== 2) {
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

const PaginationLastNumber: React.FC<TProps> = ({ isPageRangeOverTotal }) => {
  const { activePage, totalPages, pageStep } = usePaginationContext();
  if (isPageRangeOverTotal) {
    return;
  }
  if (activePage <= totalPages - pageStep - 1) {
    if (
      activePage <= totalPages - pageStep - 2 &&
      totalPages - 2 * pageStep !== 2
    ) {
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

export const PaginationList = memo(_PaginationList);
