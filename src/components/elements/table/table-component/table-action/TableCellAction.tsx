import React from "react";

import { GlobalTypes } from "@/utils";

import { TableCell } from "../table-cell";
import { TableCellHead } from "../table-cell-head";

export const TableCellHeadAction: React.FC = () => {
  return (
    <TableCellHead isLast width="8rem" textAlign="center">
      Hành động
    </TableCellHead>
  );
};

export const TableCellAction: GlobalTypes.FCChildren = ({ children }) => {
  return (
    <TableCell width="8rem" textAlign="right">
      <div className="flex justify-center">{children}</div>
    </TableCell>
  );
};
