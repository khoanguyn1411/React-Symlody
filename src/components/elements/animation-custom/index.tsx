import React, { forwardRef, ReactNode } from "react";

import { AnimationEffects, AnimationUnmount } from "./animation-components";

type TProps = {
  children?: ReactNode;
  isShowing?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

// eslint-disable-next-line react/display-name
export const AnimationCustom = forwardRef<HTMLDivElement, TProps>(
  ({ className, children, isShowing, onClick }, ref) => {
    return (
      <div aria-hidden onClick={onClick}>
        <AnimationEffects ref={ref} className={className} isShowing={isShowing}>
          <AnimationUnmount isShowing={isShowing}>{children}</AnimationUnmount>
        </AnimationEffects>
      </div>
    );
  }
);
