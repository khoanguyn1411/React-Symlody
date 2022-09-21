import classNames from "classnames";
import { memo, useEffect, useState } from "react";

import { GlobalTypes } from "@/types";

import { ANIMATION_DEFAULT_TIME } from "../constants";

type TProps = {
  isShowing: boolean;
};

const _AnimationHide: GlobalTypes.FCPropsWithChildren<TProps> = ({
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

export const AnimationHide = memo(_AnimationHide);
