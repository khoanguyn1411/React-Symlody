import { createContext, useContext, useState } from "react";

import { GlobalTypes } from "@/types";

const PaginationContext = createContext<TPropsPaginationContext>({
  activePage: undefined,
  rowsQuantity: undefined,
  setActivePage: undefined,
  setRowsQuantity: undefined,
  totalPages: undefined,
});

type TPropsPaginationContext = {
  activePage: number;
  rowsQuantity: string;
  setActivePage: (activePage: number) => void;
  setRowsQuantity: (rowsQuantity: string) => void;
} & TPropsPagination;

export type TPropsPagination = {
  pageStep?: number;
  totalPages: number;
  quantityDisplay?: string[];
  onPaginationChange?: (activePage: number) => void;
  onRowQuantityChange?: (row: string) => void;
};
const PaginationProvider: GlobalTypes.FCPropsWithChildren<TPropsPagination> = ({
  children,
  pageStep = 2,
  quantityDisplay = ["5", "10", "15"],
  ...props
}) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [rowsQuantity, setRowsQuantity] = useState<string>("15");
  const value = {
    activePage,
    rowsQuantity,
    pageStep,
    quantityDisplay,
    setActivePage,
    setRowsQuantity,
    ...props,
  };
  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};

const usePaginationContext = (): TPropsPaginationContext => {
  const context = useContext(PaginationContext);
  if (typeof context === undefined) {
    throw new Error("This component must be used within pagination context.");
  }
  return context;
};

export { PaginationProvider, usePaginationContext };
