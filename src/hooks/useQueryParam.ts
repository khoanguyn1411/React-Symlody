import { useSearchParams } from "react-router-dom";

export const useQueryParam = <T>() => {
  const [searchParams, setSearchParams] = useSearchParams();
  const getAllQueryParams = (): T => {
    let params = {};
    searchParams.forEach((value, key) => {
      params = { ...params, [key]: value };
    });
    return params as T;
  };

  const queryMethods = {
    set(key: string, value: string) {
      searchParams.set(key, value);
      setSearchParams(searchParams);
      return;
    },
    delete(key: string) {
      searchParams.delete(key);
      setSearchParams(searchParams);
      return;
    },
  };

  const getQueryMethodWithKey = (key: string) => {
    return {
      set(value: string) {
        queryMethods.set(key, value);
        return;
      },
      delete() {
        queryMethods.delete(key);
        return;
      },
    };
  };

  return {
    currentQueryParams: getAllQueryParams(),
    getQueryMethodWithKey,
    queryMethods,
    searchParams,
  };
};
