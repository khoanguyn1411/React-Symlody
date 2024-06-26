import classNames from "classnames";
import { useEffect, useState } from "react";

import { AppReact } from "@/utils/types";

import { ANIMATION_DEFAULT_TIME } from "../constants";

type TProps = {
  isShowing: boolean;
};

export const AnimationUnmount: AppReact.FC.PropsWithChildren<TProps> = ({
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
