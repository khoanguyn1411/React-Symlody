import { memo } from "react";

import { Select, TItemListSelect } from "@/components";
import { FormatService } from "@/utils";

import { usePaginationContext } from "../context";

const _PaginationPickRows: React.FC = () => {
  const { quantityDisplay, limit, activePage, setLimit, onLimitChange } =
    usePaginationContext();

  const handleRowsChange = (_limit: string) => {
    const limitAsNumber = FormatService.toNumber(_limit);
    setLimit(limitAsNumber);
    if (limit !== limitAsNumber) {
      onLimitChange && onLimitChange(activePage, limitAsNumber);
    }
  };

  return (
    <div className="flex items-center ml-8">
      <h1 className="mr-2 font-medium">Hiển thị: </h1>
      <Select
        className="w-28"
        classNameDisplay="h-9"
        suffix="hàng"
        placement="top-left"
        list={quantityDisplay.map((item): TItemListSelect => ({ value: item }))}
        value={FormatService.toString(limit)}
        onChange={handleRowsChange}
      />
    </div>
  );
};

export const PaginationPickRows = memo(_PaginationPickRows);
