import React, { useMemo } from "react";

import { FormatService } from "@/utils";

import { usePaginationContext } from "../context";

export const PaginationPickPage: React.FC = () => {
  const { totalPages, setActivePage, onPaginationChange, limit } =
    usePaginationContext();
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
        onPaginationChange(totalPages, limit);
        return;
      }
      if (page < 1) {
        setActivePage(1);
        onPaginationChange(1, limit);
        return;
      }
      setActivePage(page);
      onPaginationChange(page, limit);
    },
    [limit, onPaginationChange, setActivePage, totalPages]
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
