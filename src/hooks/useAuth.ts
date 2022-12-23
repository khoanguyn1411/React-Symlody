import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/features";
import {
  getMeAsync,
  logoutAsync,
  setIsAlreadyGetMe,
  setIsAuth,
} from "@/features/reducers";
import { TokenService } from "@/utils/funcs/token-service";
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.auth);

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
      dispatch(setIsAlreadyGetMe(true));
      if (res.payload) {
        dispatch(setIsAuth(true));
        return;
      }
      dispatch(logoutAsync());
      dispatch(setIsAuth(false));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state.isAuth]);

  return { isAuth: state.isAuth, isLoading };
};
