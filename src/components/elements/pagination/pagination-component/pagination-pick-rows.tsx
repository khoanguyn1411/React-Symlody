import { memo } from "react";

import { Select, TItemListSelect } from "@/components";

import { usePaginationContext } from "../context";

const _PaginationPickRows: React.FC = () => {
  const {
    quantityDisplay,
    rowsQuantity,
    setRowsQuantity,
    onRowQuantityChange,
  } = usePaginationContext();

  const handleRowsChange = (row: string) => {
    setRowsQuantity(row);
    if (row !== rowsQuantity) {
      onRowQuantityChange && onRowQuantityChange(row);
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
        value={rowsQuantity}
        onChange={handleRowsChange}
      />
    </div>
  );
};

export const PaginationPickRows = memo(_PaginationPickRows);
