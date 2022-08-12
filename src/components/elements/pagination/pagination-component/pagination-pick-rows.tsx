import { Select } from "@/components";

import { usePaginationContext } from "../context";

export const PaginationPickRows: React.FC = () => {
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
      <h1 className="mr-2 font-bold">Hiển thị: </h1>
      <Select
        className="w-28"
        classNameDisplay="h-9"
        suffix="hàng"
        list={quantityDisplay}
        value={rowsQuantity}
        onChange={handleRowsChange}
      ></Select>
    </div>
  );
};
