import { useEffect, useState } from "react";

import { Api } from "@/api";
import { useAppDispatch, useAppSelector } from "@/features";
import { getMeAsync, setIsAuth } from "@/features/reducers";

export function useAuth() {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setIsLoading(true);
      checkAuth().then((res) => {
        dispatch(setIsAuth(res));
        setIsLoading(false);
      });
    }
  }, []);

  const checkAuth = async () => {
    const token = Api.getToken();
    if (!token) return false;

    const result = await dispatch(getMeAsync());
    if (!result.payload) return false;

    return true;
  };

  return { isAuth: state.isAuth, isLoading };
}
