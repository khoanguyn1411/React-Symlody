import { useEffect, useTransition } from "react";
import { NavigateOptions, useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/features";
import { setIsRouteLoading } from "@/features/reducers";

/**
 * Navigate to route with top progress bar animation.
 * @returns Custom navigate to trigger such animation. same usage with navigate from `useNavigate` React hook
 */
export const useNavigateWithTransition = () => {
  const [isPending, startTransition] = useTransition();
  const dispatch = useAppDispatch();
  const rootNavigate = useNavigate();

  const navigate = (path: string, options?: NavigateOptions) => {
    startTransition(() => rootNavigate(path, options));
  };

  // Trigger loading animation of top progress bar.
  useEffect(() => {
    dispatch(setIsRouteLoading(isPending));
  }, [dispatch, isPending]);

  return {
    navigate,
  };
};
