import React, { useMemo } from "react";

import { usePaginationContext } from "../context";

export const PaginationPickPage: React.FC = () => {
  const { totalPages, setConfig, config } = usePaginationContext();

  const adjustPagination = useMemo(
    () => (target: HTMLInputElement) => {
      const _value = target.value;
      if (!_value) {
        return;
      }
      target.value = "";
      const page = Number(_value);
      if (page > totalPages) {
        setConfig({ page: totalPages });
        return;
      }
      if (page < 1) {
        setConfig({ page: 1 });
        return;
      }
      setConfig({ page });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [config.limit, totalPages]
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
