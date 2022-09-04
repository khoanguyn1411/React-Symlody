import { createContext, useContext, useState } from "react";

import { GlobalTypes } from "@/global";

export type TOrdering = "asc" | "des";

type TPropsTableContext = {
  currentSort: string;
  currentOrdering: TOrdering;
  setCurrentSort: (currentSort: string) => void;
  setCurrentOrdering: (currentOrdering: TOrdering) => void;
} & TPropsTable;

export type TPropsTable = {
  defaultSortActive?: string;
  defaultOrderActive?: TOrdering;
};
const TableContext = createContext<TPropsTableContext>(null);

const TableProvider: GlobalTypes.FCPropsWithChildren<TPropsTable> = ({
  children,
  defaultSortActive,
  defaultOrderActive,
}) => {
  const [currentSort, setCurrentSort] = useState<string>(defaultSortActive);
  const [currentOrdering, setCurrentOrdering] =
    useState<TOrdering>(defaultOrderActive);
  const value = {
    currentSort,
    currentOrdering,
    defaultSortActive,
    defaultOrderActive,
    setCurrentSort,
    setCurrentOrdering,
  };
  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

const useTableContext = (): TPropsTableContext => {
  const context = useContext(TableContext);
  if (typeof context === undefined) {
    throw new Error("This component must be used within table context.");
  }
  return context;
};

export { TableProvider, useTableContext };
