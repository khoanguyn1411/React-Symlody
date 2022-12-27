import { useEffect, useTransition } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/features";
import { setIsRouteLoading } from "@/features/reducers";

export const useNavigateWithTransition = () => {
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();
  const rootNavigate = useNavigate();

  const navigate = (path: string) => {
    startTransition(() => rootNavigate(path));
  };

  useEffect(() => {
    dispatch(setIsRouteLoading(isPending));
  }, [dispatch, isPending]);

  return {
    navigate,
  };
};
