import { useCallback, useEffect, useState } from "react";

import { APP_CONSTANTS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  getMeAsync,
  logout,
  setIsAuth,
  setIsCompactSidebar,
} from "@/features/reducers";
import { LocalStorageService, TokenService } from "@/utils";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  const checkIsSignIn = useCallback(() => {
    if (!TokenService.isValid()) {
      dispatch(setIsAuth(false));
      return false;
    }
    return true;
  }, [dispatch]);

  useEffect(() => {
    setIsLoading(true);
    if (!checkIsSignIn()) {
      setIsLoading(false);
      return;
    }
    if (state.isAuth) {
      setIsLoading(false);
      return;
    }
    dispatch(getMeAsync()).then((res) => {
      setIsLoading(false);
      if (res.payload) {
        dispatch(setIsAuth(true));
        return;
      }
      dispatch(logout());
    });
  }, [checkIsSignIn, dispatch, state.isAuth]);

  useEffect(() => {
    getIsCompact();

    window.addEventListener("storage", checkIsSignIn);
    return () => {
      window.removeEventListener("storage", checkIsSignIn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIsCompact = () => {
    const isCompact =
      LocalStorageService.getValue<boolean>(APP_CONSTANTS.IS_COMPACT_SIDEBAR) ??
      false;
    dispatch(setIsCompactSidebar(isCompact));
  };

  return { isAuth: state.isAuth, isLoading };
};
