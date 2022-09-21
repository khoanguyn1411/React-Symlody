import { useEffect, useState } from "react";

import { APP_CONSTANTS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  getMeAsync,
  setIsAuth,
  setIsCompactSidebar,
} from "@/features/reducers";
import { TokenService } from "@/utils";

export function useAuth() {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    checkAuth().then((res) => {
      dispatch(setIsAuth(res));
      setIsLoading(false);
    });
    getIsCompact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isAuth]);

  useEffect(() => {
    dispatch(getMeAsync());
  }, [dispatch]);

  const checkAuth = async () => {
    if (!TokenService.isValid()) {
      return false;
    }
    return true;
  };

  const getIsCompact = () => {
    const isCompact =
      (localStorage.getItem(APP_CONSTANTS.IS_COMPACT_SIDEBAR) || "false") ===
      "true";

    dispatch(setIsCompactSidebar(isCompact));
  };

  return { isAuth: state.isAuth, isLoading };
}
