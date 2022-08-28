import React, { ReactNode } from "react";

import { TableCell, TableCellHead } from "@/components";

export const TableCellHeadAction: React.FC = () => {
  return (
    <TableCellHead isLast width="8rem" textAlign="center">
      Hành động
    </TableCellHead>
  );
};

type TProps = {
  children: ReactNode;
};
export const TableCellAction: React.FC<TProps> = ({ children }) => {
  return (
    <TableCell width="8rem" textAlign="right">
      <div className="flex justify-center">{children}</div>
    </TableCell>
  );
};
