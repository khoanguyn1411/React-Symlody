import classNames from "classnames";

import { AppReact } from "@/utils/types";

import {
  TableRowProvider,
  TPropsTableRow,
  useTableRowContext,
} from "./context";

const TableRowContent: AppReact.FC.Children = ({ children }) => {
  const { isSkeleton } = useTableRowContext();
  return (
    <tr
      className={classNames("", {
        "animate-skeleton h-11": isSkeleton,
        "h-14": !isSkeleton,
      })}
    >
      {children}
    </tr>
  );
};

export const TableRow: AppReact.FC.PropsWithChildren<TPropsTableRow> = ({
  children,
  ...props
}) => {
  return (
    <TableRowProvider {...props}>
      <TableRowContent>{children}</TableRowContent>
    </TableRowProvider>
  );
};
