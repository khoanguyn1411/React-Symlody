import classNames from "classnames";

import { GlobalTypes } from "@/global";

import {
  TableProvider,
  TPropsTableRow,
  useTableRowContext,
} from "../../context";

export const TableRowContent: GlobalTypes.FCChildren = ({ children }) => {
  const { isSkeleton } = useTableRowContext();
  return (
    <tr className={classNames(isSkeleton && "animate-skeleton")}>{children}</tr>
  );
};

export const TableRow: GlobalTypes.FCPropsWithChildren<TPropsTableRow> = ({
  children,
  ...props
}) => {
  return (
    <TableProvider {...props}>
      <TableRowContent>{children}</TableRowContent>
    </TableProvider>
  );
};
