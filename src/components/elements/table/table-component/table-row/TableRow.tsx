import classNames from "classnames";

import { GlobalTypes } from "@/utils";

import {
  TableRowProvider,
  TPropsTableRow,
  useTableRowContext,
} from "./context";

const TableRowContent: GlobalTypes.FCChildren = ({ children }) => {
  const { isSkeleton } = useTableRowContext();
  return (
    <tr
      className={classNames("hover:bg-gray-50 transition-colors duration-300", {
        "animate-skeleton": isSkeleton,
      })}
    >
      {children}
    </tr>
  );
};

export const TableRow: GlobalTypes.FCPropsWithChildren<TPropsTableRow> = ({
  children,
  ...props
}) => {
  return (
    <TableRowProvider {...props}>
      <TableRowContent>{children}</TableRowContent>
    </TableRowProvider>
  );
};
