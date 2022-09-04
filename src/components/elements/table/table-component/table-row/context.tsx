import { createContext, useContext } from "react";

import { GlobalTypes } from "@/global";

type TPropsTableRowContext = {
  index?: number;
  isSkeleton?: boolean;
};

export type TPropsTableRow = TPropsTableRowContext;

const TableRowContext = createContext<TPropsTableRowContext>(null);

const TableRowProvider: GlobalTypes.FCPropsWithChildren<TPropsTableRow> = ({
  children,
  isSkeleton = false,
  index,
}) => {
  const value = { index, isSkeleton };
  return (
    <TableRowContext.Provider value={value}>
      {children}
    </TableRowContext.Provider>
  );
};

const useTableRowContext = (): TPropsTableRowContext => {
  const context = useContext(TableRowContext);
  if (typeof context === undefined) {
    throw new Error("This component must be used within table row context.");
  }
  return context;
};

export { TableRowProvider, useTableRowContext };
