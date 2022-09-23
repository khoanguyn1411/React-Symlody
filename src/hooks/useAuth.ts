import { useEffect, useRef, useState } from "react";

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
  const isAlreadyGetMe = useRef(false);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (!TokenService.isValid()) {
      setIsLoading(false);
      return;
    }

    if (isAlreadyGetMe.current) {
      setIsLoading(false);
      return;
    }

    dispatch(getMeAsync()).then((res) => {
      setIsLoading(false);
      if (res.payload) {
        dispatch(setIsAuth(true));
        isAlreadyGetMe.current = true;
        return;
      }
      dispatch(logout());
    });
  }, [dispatch, state.isAuth]);

  useEffect(() => {
    getIsCompact();
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
