import React from "react";

import {
  AnimationEffects,
  AnimationHide,
  AnimationUnmount,
} from "./animation-components";
import { TAnimationEffectsProps } from "./type";

/**
 * For toggle element, such as dropdown, select, tooltip, modal, ... please wrap the toggle
 * component with an AnimationCustom component in order to apply fade animation.
 */
export const AnimationCustom: React.FC<TAnimationEffectsProps> = ({
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

/**
 * For toggle element, such as dropdown, select, tooltip, modal, ... please wrap the toggle
 * component with an AnimationCustom component in order to apply fade animation.
 */
export const AnimationKeepDom: React.FC<TAnimationEffectsProps> = ({
  className,
  children,
  isShowing,
  attrs,
}) => {
  return (
    <AnimationHide isShowing={isShowing}>
      <AnimationEffects
        attrs={attrs}
        className={className}
        isShowing={isShowing}
      >
        {children}
      </AnimationEffects>
    </AnimationHide>
  );
};

export * from "./animation-components";
