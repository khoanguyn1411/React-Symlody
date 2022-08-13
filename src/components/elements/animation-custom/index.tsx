import React, { ReactNode } from "react";

import { AnimationEffects, AnimationUnmount } from "./animation-components";

type TProps = {
  children?: ReactNode;
  isShowing?: boolean;
  className?: string;
  attrs?: React.HTMLAttributes<HTMLDivElement>;
};

/**
 * For toggle element, such as dropdown, select, tooltip, modal, ... please wrap the toggle
 * component with an AnimationCustom component in order to apply animation fade.
 */
export const AnimationCustom: React.FC<TProps> = ({
  className,
  children,
  isShowing,
  attrs,
}) => {
  return (
    <AnimationUnmount isShowing={isShowing}>
      <AnimationEffects
        attrs={attrs}
        className={className}
        isShowing={isShowing}
      >
        {children}
      </AnimationEffects>
    </AnimationUnmount>
  );
};
