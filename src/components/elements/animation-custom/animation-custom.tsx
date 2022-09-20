import React, { memo } from "react";

import {
  AnimationEffects,
  AnimationHide,
  AnimationUnmount,
} from "./animation-components";
import { TAnimationEffectsProps } from "./type";

const _AnimationCustom: React.FC<TAnimationEffectsProps> = ({
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

const _AnimationKeepDom: React.FC<TAnimationEffectsProps> = ({
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

/**
 * For toggle element, such as dropdown, select, tooltip, modal, ... please wrap the toggle
 * component with an AnimationCustom component in order to apply fade animation.
 */
export const AnimationCustom = memo(_AnimationCustom);

/**
 * For toggle element, such as dropdown, select, tooltip, modal, ... please wrap the toggle
 * component with an AnimationCustom component in order to apply fade animation.
 */
export const AnimationKeepDom = memo(_AnimationKeepDom);
