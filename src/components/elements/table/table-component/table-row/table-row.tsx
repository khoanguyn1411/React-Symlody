import classNames from "classnames";
import { memo } from "react";

import { GlobalTypes } from "@/types";

import {
  TableRowProvider,
  TPropsTableRow,
  useTableRowContext,
} from "./context";

const _TableRowContent: GlobalTypes.FCChildren = ({ children }) => {
  const { isSkeleton } = useTableRowContext();
  return (
    <tr className={classNames(isSkeleton && "animate-skeleton")}>{children}</tr>
  );
};

const _TableRow: GlobalTypes.FCPropsWithChildren<TPropsTableRow> = ({
  children,
  ...props
}) => {
  return (
    <TableRowProvider {...props}>
      <TableRowContent>{children}</TableRowContent>
    </TableRowProvider>
  );
};

export const TableRow = memo(_TableRow);
export const TableRowContent = memo(_TableRowContent);
