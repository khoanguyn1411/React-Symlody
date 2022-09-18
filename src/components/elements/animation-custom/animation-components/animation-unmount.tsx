import classNames from "classnames";
import { useEffect, useState } from "react";

import { GlobalTypes } from "@/global";

import { ANIMATION_DEFAULT_TIME } from "../constants";

type TProps = {
  isShowing: boolean;
};

export const AnimationUnmount: GlobalTypes.FCPropsWithChildren<TProps> = ({
  isShowing,
  children,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isCancel, setIsCancel] = useState<boolean>(false);
  useEffect(() => {
    if (isShowing) {
      setIsMounted(true);
      setIsCancel(false);
      return;
    }
    setIsCancel(true);
    const unMountedId = setTimeout(() => {
      setIsMounted(false);
    }, ANIMATION_DEFAULT_TIME);

    return () => {
      clearTimeout(unMountedId);
    };
  }, [isShowing]);

  if (!isMounted) {
    return;
  }
  return (
    <div className={classNames(isCancel && "pointer-events-none")}>
      {children}
    </div>
  );
};
