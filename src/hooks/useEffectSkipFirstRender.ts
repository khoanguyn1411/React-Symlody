import { DependencyList, useEffect, useRef } from "react";

/**
 * Skip first render of useEffect.
 * @param callback Callback to perform.
 * @param deps Dependencies to watch.
 */
export const useEffectSkipFirstRender = (
  callback: () => void,
  deps: DependencyList
): void => {
  const isFirstMounted = useRef(false);
  useEffect(() => {
    if (!isFirstMounted.current) {
      isFirstMounted.current = true;
      return;
    }
    callback && callback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
};
