import classNames from "classnames";
import React, { forwardRef, ReactNode } from "react";

import { ANIMATION_DEFAULT_TIME } from "../constants";

type TProps = {
  className?: string;
  isShowing: boolean;
  children: ReactNode;
};

// eslint-disable-next-line react/display-name
export const AnimationEffects = forwardRef<HTMLDivElement, TProps>(
  ({ className, isShowing, children }, ref) => {
    return (
      <div
        ref={ref}
        className={classNames(
          `absolute duration-${ANIMATION_DEFAULT_TIME}`,
          className,
          {
            "opacity-0 invisible": !isShowing,
            "opacity-100 visible": isShowing,
          }
        )}
      >
        {children}
      </div>
    );
  }
);
