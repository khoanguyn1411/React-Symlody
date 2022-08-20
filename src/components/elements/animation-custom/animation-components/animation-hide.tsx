import classNames from "classnames";
import React, { ReactNode, useEffect, useState } from "react";

import { ANIMATION_DEFAULT_TIME } from "../constants";

type TProps = {
  isShowing: boolean;
  children: ReactNode;
};

export const AnimationHide: React.FC<TProps> = ({ isShowing, children }) => {
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
