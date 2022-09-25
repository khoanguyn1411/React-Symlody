import React, { memo, useMemo } from "react";

import { FormatService } from "@/utils";

import { usePaginationContext } from "../context";

const _PaginationPickPage: React.FC = () => {
  const { totalPages, setActivePage } = usePaginationContext();
  const adjustPagination = useMemo(
    () => (target: HTMLInputElement) => {
      const _value = target.value;
      if (!_value) {
        return;
      }
      target.value = "";
      const page = FormatService.toNumber(_value);
      if (page > totalPages) {
        setActivePage(totalPages);
        return;
      }
      if (page < 1) {
        setActivePage(1);
        return;
      }
      setActivePage(page);
    },
    [setActivePage, totalPages]
  );

  const handlePickPageOnBlur = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    adjustPagination(event.target);
  };

  const handlePickPageOnEnter = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key !== "Enter") {
      return;
    }
    adjustPagination(event.target as HTMLInputElement);
  };

  return (
    <div className="flex border-l border-gray-300 place-self-stretch">
      <input
        className="w-32 h-full px-2 rounded-r-md focus:outline-none"
        placeholder="Chọn trang"
        onBlur={handlePickPageOnBlur}
        onKeyDownCapture={handlePickPageOnEnter}
        type="number"
      />
    </div>
  );
};

export const PaginationPickPage = memo(_PaginationPickPage);
