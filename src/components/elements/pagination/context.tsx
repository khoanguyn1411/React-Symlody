import {
  createContext,
  DependencyList,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";

import { CommonFilterParams } from "@/features/types/models/filter-params";
import { AppReact } from "@/utils/types";

import { APP_PAGINATION } from "./constants";

const PaginationContext = createContext<TPropsPaginationContext>({
  config: undefined,
  setConfig: undefined,
});

type TPropsPaginationContext = {
  config: CommonFilterParams.Pagination;
  setConfig: (config: Partial<CommonFilterParams.Pagination>) => void;
} & TPropsPagination;

export type TPropsPagination = {
  defaultLimit?: number;
  count?: number;
  pageStep?: number;
  totalPages?: number;
  quantityDisplay?: number[];
  onChange?: (config: CommonFilterParams.Pagination) => void;
  onResetListeners?: DependencyList;
};
const PaginationProvider: AppReact.FC.PropsWithChildren<TPropsPagination> = ({
  children,
  pageStep = 2,
  quantityDisplay = [5, 10, 15],
  onResetListeners,
  defaultLimit,
  ...props
}) => {
  const [config, _setConfig] = useState<CommonFilterParams.Pagination>(() => ({
    page: 1,
    limit: defaultLimit ?? APP_PAGINATION.DEFAULT_PAGINATION_LIMIT,
  }));

  const setConfig = (partialConfig: Partial<CommonFilterParams.Pagination>) => {
    return _setConfig((prev) => ({ ...prev, ...partialConfig }));
  };

  const _totalPage = useMemo(() => {
    if (props.totalPages) {
      return props.totalPages;
    }
    if (config.limit && props.count) {
      return Math.ceil(props.count / config.limit);
    }
    return null;
  }, [config.limit, props.count, props.totalPages]);

  useEffect(() => {
    if (config.page > _totalPage) {
      setConfig({ page: 1 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_totalPage, config.page]);

  useLayoutEffect(
    () => {
      setConfig({ page: 1 });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    onResetListeners ?? []
  );

  useEffect(() => {
    props.onChange(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config]);

  const value = {
    pageStep,
    quantityDisplay,
    totalPages: _totalPage,
    config,
    setConfig,
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
