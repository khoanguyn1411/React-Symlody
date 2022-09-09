import { useEffect, useState } from "react";

import { Api } from "@/api";
import { APP_CONSTANTS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  getMeAsync,
  refreshTokenAsync,
  setIsAuth,
  setIsCompactSidebar,
} from "@/features/reducers";

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

  const checkAuth = async () => {
    const token = Api.getToken();
    if (!token) return false;

    const result = await dispatch(getMeAsync());
    if (!result.payload) {
      await dispatch(refreshTokenAsync({ token: token })).then((res) => {
        if (res.payload) {
          return true;
        }
      });
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
