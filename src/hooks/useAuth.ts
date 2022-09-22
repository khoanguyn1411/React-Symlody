import { useEffect, useState } from "react";

import { APP_CONSTANTS } from "@/constants";
import { useAppDispatch, useAppSelector } from "@/features";
import {
  getMeAsync,
  setIsAuth,
  setIsCompactSidebar,
} from "@/features/reducers";
import { TokenService } from "@/utils";

export const useAuth = () => {
  const dispatch = useAppDispatch();

  const state = useAppSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(true);

  const checkIsSignIn = () => {
    setIsLoading(false);
    if (TokenService.isValid()) {
      dispatch(setIsAuth(true));
      return;
    }
    dispatch(setIsAuth(false));
  };

  useEffect(() => {
    if (state.isAuth) {
      dispatch(getMeAsync());
    }
    setIsLoading(true);
    checkIsSignIn();
    getIsCompact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.isAuth]);

  useEffect(() => {
    window.addEventListener("storage", checkIsSignIn);
    return () => {
      window.removeEventListener("storage", checkIsSignIn);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getIsCompact = () => {
    const isCompact =
      (localStorage.getItem(APP_CONSTANTS.IS_COMPACT_SIDEBAR) || "false") ===
      "true";

    dispatch(setIsCompactSidebar(isCompact));
  };

  return { isAuth: state.isAuth, isLoading };
};
