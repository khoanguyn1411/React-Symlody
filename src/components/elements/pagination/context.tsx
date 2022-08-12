import React, { createContext, ReactNode, useContext, useState } from "react";

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
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  setRowsQuantity: React.Dispatch<React.SetStateAction<string>>;
} & TPropsPagination;

export type TPropsPagination = {
  pageStep?: number;
  totalPages: number;
  quantityDisplay?: string[];
  onPaginationChange?: (activePage: number) => void;
  onRowQuantityChange?: (row: string) => void;
};
const PaginationProvider: React.FC<
  TPropsPagination & { children: ReactNode }
> = ({
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
