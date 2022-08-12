import React, { useEffect } from "react";

import { Select } from "@/components";

import { usePaginationContext } from "../context";

export const PaginationPickRows = () => {
  const { setRowsQuantity, rowsQuantity, onRowQuantityChange } =
    usePaginationContext();

  const handleRowsChange = (row: string) => {
    setRowsQuantity(row);
  };

  useEffect(() => {
    onRowQuantityChange && onRowQuantityChange(rowsQuantity);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowsQuantity]);

  return (
    <div className="flex items-center">
      <h1 className="mr-3">Hiển thị: </h1>
      <Select
        className="w-32"
        suffix="hàng"
        list={["5", "10", "15", "20"]}
        value={rowsQuantity}
        onChange={handleRowsChange}
      ></Select>
    </div>
  );
};
