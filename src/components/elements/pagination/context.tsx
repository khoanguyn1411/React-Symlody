import React, { createContext, ReactNode, useContext, useState } from "react";

const PaginationContext = createContext(undefined);

type TPropsPaginationContext = {
  activePage: 1;
  pageStep?: number;
  totalPages: number;
  rowsQuantity: string;
  onPaginationChange: (activePage: number) => void;
  onRowQuantityChange: (row: string) => void;
  setActivePage: React.Dispatch<React.SetStateAction<number>>;
  setRowsQuantity: (row: string) => void;
};

export type TPropsPagination = {
  children?: ReactNode;
  pageStep?: number;
  totalPages: number;
  onPaginationChange?: (activePage: number) => void;
  onRowQuantityChange?: (row: string) => void;
};
const PaginationProvider: React.FC<TPropsPagination> = ({
  children,
  pageStep = 2,
  ...props
}) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [rowsQuantity, setRowsQuantity] = useState<string>("15");
  const value = {
    activePage,
    rowsQuantity,
    pageStep,
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
