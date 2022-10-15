import {
  createContext,
  DependencyList,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import { APP_PAGINATION } from "@/constants";
import { GlobalTypes } from "@/utils";

const PaginationContext = createContext<TPropsPaginationContext>({
  activePage: undefined,
  limit: undefined,
  setActivePage: undefined,
  setLimit: undefined,
});

type TPropsPaginationContext = {
  activePage: number;
  limit: number;
  setActivePage: (activePage: number) => void;
  setLimit: (rowsQuantity: number) => void;
} & TPropsPagination;

export type TPropsPagination = {
  defaultLimit?: number;
  count?: number;
  pageStep?: number;
  totalPages?: number;
  quantityDisplay?: string[];
  onPaginationChange?: (activePage: number, limit: number) => void;
  onLimitChange?: (activePage: number, limit: number) => void;
  onResetPagination?: {
    changeListener: DependencyList;
    callback: (limit: number) => void;
  };
};
const PaginationProvider: GlobalTypes.FCPropsWithChildren<TPropsPagination> = ({
  children,
  pageStep = 2,
  quantityDisplay = ["5", "10", "15"],
  onResetPagination,
  defaultLimit,
  ...props
}) => {
  const [activePage, setActivePage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(
    defaultLimit ?? APP_PAGINATION.DEFAULT_PAGINATION_LIMIT
  );

  const _totalPage = useMemo(() => {
    if (props.totalPages) {
      return props.totalPages;
    }
    if (limit && props.count) {
      return Math.ceil(props.count / limit);
    }
    return undefined;
  }, [limit, props.count, props.totalPages]);

  useEffect(() => {
    if (activePage > _totalPage) {
      setActivePage(1);
      onResetPagination?.callback(limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_totalPage, activePage]);

  useLayoutEffect(
    () => {
      setActivePage(1);
      onResetPagination?.callback(limit);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onResetPagination ? onResetPagination.changeListener : []
  );

  const value = {
    limit,
    pageStep,
    activePage,
    quantityDisplay,
    totalPages: _totalPage,
    setLimit,
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
