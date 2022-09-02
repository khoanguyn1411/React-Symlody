import classNames from "classnames";
import { useEffect, useState } from "react";

import { GlobalTypes } from "@/global";

import { ANIMATION_DEFAULT_TIME } from "../constants";

type TProps = {
  isShowing: boolean;
};

export const AnimationHide: GlobalTypes.FCPropsWithChildren<TProps> = ({
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

  return (
    <div className={classNames({ visible: isMounted, invisible: !isMounted })}>
      {children}
    </div>
  );
};
