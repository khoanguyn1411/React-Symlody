import React from "react";

import { GlobalTypes } from "@/global";

import { TableCell } from "../table-cell";
import { TableCellHead } from "../table-cell-head";

export const TableCellHeadAction: React.FC = () => {
  return (
    <TableCellHead isLast width="8rem" textAlign="center">
      Hành động
    </TableCellHead>
  );
};

export const TableCellAction: GlobalTypes.FCPropsWithChildren<{
  index?: number;
}> = ({ children, index }) => {
  return (
    <TableCell index={index} width="8rem" textAlign="right">
      <div className="flex justify-center">{children}</div>
    </TableCell>
  );
};
