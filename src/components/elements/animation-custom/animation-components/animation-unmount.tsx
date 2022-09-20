import classNames from "classnames";
import { memo, useEffect, useState } from "react";

import { GlobalTypes } from "@/types";

import { ANIMATION_DEFAULT_TIME } from "../constants";

type TProps = {
  isShowing: boolean;
};

const _AnimationUnmount: GlobalTypes.FCPropsWithChildren<TProps> = ({
  isShowing,
  children,
}) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  useEffect(() => {
    if (isShowing) {
      setIsMounted(true);
      return;
    }
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
    <div className={classNames(!isShowing && "pointer-events-none")}>
      {children}
    </div>
  );
};

export const AnimationUnmount = memo(_AnimationUnmount);
