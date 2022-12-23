import React from "react";

import { usePaginationContext } from "../context";
import { PaginationDot } from "./PaginationDot";
import { PaginationItem } from "./PaginationItem";

type TProps = {
  isPageRangeOverTotal: boolean;
};

export const PaginationList: React.FC = () => {
  const {
    totalPages,
    pageStep,
    config: { page },
  } = usePaginationContext();
  const isPageRangeOverTotal = pageStep * 2 + 1 >= totalPages;
  return (
    <ul className="flex items-baseline">
      <PaginationFirstPage isPageRangeOverTotal={isPageRangeOverTotal} />

      {[...Array(isPageRangeOverTotal ? totalPages : pageStep * 2 + 1)].map(
        (_, index) => {
          if (page <= pageStep || isPageRangeOverTotal) {
            return <PaginationItem key={index} pageIndex={index + 1} />;
          }
          if (page > pageStep && page < totalPages - pageStep) {
            return (
              <PaginationItem key={index} pageIndex={page + index - pageStep} />
            );
          }
          if (page >= totalPages - pageStep) {
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
  const {
    config: { page },
    pageStep,
    totalPages,
  } = usePaginationContext();
  if (isPageRangeOverTotal) {
    return;
  }
  if (page > pageStep + 1) {
    if (page > pageStep + 2 && totalPages - 2 * pageStep !== 2) {
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
  const {
    config: { page },
    totalPages,
    pageStep,
  } = usePaginationContext();
  if (isPageRangeOverTotal) {
    return;
  }
  if (page <= totalPages - pageStep - 1) {
    if (page <= totalPages - pageStep - 2 && totalPages - 2 * pageStep !== 2) {
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
