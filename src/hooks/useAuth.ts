import { useEffect, useState } from "react";

import { APP_LOCAL_STORAGE_KEYS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  getMeAsync,
  getOrganizationAsync,
  logoutAsync,
  setIsAlreadyGetMe,
  setIsAuth,
  setIsCompactSidebar,
  userSelectors,
} from "@/features/reducers";
import { LocalStorageService } from "@/utils/funcs/local-storage-service";
import { TokenService } from "@/utils/funcs/token-service";
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth);
  const userCount = useAppSelector(userSelectors.selectTotal);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!TokenService.isValid()) {
      setIsLoading(false);
      return;
    }

    if (state.isAlreadyGetMe) {
      setIsLoading(false);
      return;
    }

    dispatch(getMeAsync()).then((res) => {
      setIsLoading(false);
      if (res.payload) {
        dispatch(setIsAuth(true));
        dispatch(getOrganizationAsync());
        dispatch(setIsAlreadyGetMe(true));
        return;
      }
      dispatch(logoutAsync());
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state.isAuth, userCount]);

  useEffect(() => {
    getIsCompact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIsCompact = () => {
    const isCompact =
      LocalStorageService.getValue<boolean>(
        APP_LOCAL_STORAGE_KEYS.IS_COMPACT_SIDEBAR
      ) ?? false;
    dispatch(setIsCompactSidebar(isCompact));
  };

  return { isAuth: state.isAuth, isLoading };
};
