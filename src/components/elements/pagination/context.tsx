import {
  createContext,
  DependencyList,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { GlobalTypes } from "@/types";

const PaginationContext = createContext<TPropsPaginationContext>({
  activePage: undefined,
  limit: undefined,
  count: undefined,
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
  count?: number;
  limit?: number;
  pageStep?: number;
  totalPages?: number;
  quantityDisplay?: string[];
  onPaginationChange?: (activePage: number) => void;
  onRowQuantityChange?: (row: string) => void;
  onResetPagination?: {
    changeListener: DependencyList;
    callback: () => void;
  };
};
const PaginationProvider: GlobalTypes.FCPropsWithChildren<TPropsPagination> = ({
  children,
  pageStep = 2,
  quantityDisplay = ["5", "10", "15"],
  onResetPagination,
  ...props
}) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [rowsQuantity, setRowsQuantity] = useState<string>(quantityDisplay[0]);
  const _totalPage = useMemo(() => {
    if (props.totalPages) {
      return props.totalPages;
    }
    if (props.limit && props.count) {
      return Math.ceil(props.count / props.limit);
    }
    return undefined;
  }, [props.count, props.limit, props.totalPages]);

  useEffect(() => {
    if (activePage > _totalPage) {
      setActivePage(1);
    }
  }, [_totalPage, activePage]);

  useEffect(
    () => {
      setActivePage(1);
      onResetPagination?.callback();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onResetPagination ? onResetPagination.changeListener : []
  );

  const value = {
    rowsQuantity,
    pageStep,
    activePage,
    quantityDisplay,
    totalPages: _totalPage,
    setRowsQuantity,
    setActivePage,
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
