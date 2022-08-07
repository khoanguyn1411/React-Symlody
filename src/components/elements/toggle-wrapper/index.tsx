import { forwardRef, ReactNode, useEffect, useState } from "react";

import { ANIMATION_DEFAULT_TIME } from "../animation-custom/constants";

type TProps = {
  isShowing: boolean;
  children: ReactNode;
};

// eslint-disable-next-line react/display-name
export const ToggleWrapper = forwardRef<HTMLDivElement, TProps>(
  ({ isShowing, children }, ref) => {
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
    return <>{children}</>;
  }
);
