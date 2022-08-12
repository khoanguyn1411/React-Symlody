import classNames from "classnames";
import React, { ReactNode } from "react";

import { AnimationCustom } from "../../animation-custom";
import { TPropsModalGeneral } from "../types";

type TProps = {
  children: ReactNode;
};
export const ModalWrapper: React.FC<TPropsModalGeneral & TProps> = ({
  isShowing,
  toggle,
  closeWhenClickOutside,
  children,
  size,
}) => {
  const handleCloseWhenClickOutside = () => {
    closeWhenClickOutside && toggle.setToggle();
  };
  const handleStopPropagation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    closeWhenClickOutside && event.stopPropagation();
  };
  return (
    <AnimationCustom>
      <div
        aria-hidden
        onClick={handleCloseWhenClickOutside}
        className={classNames(
          "fixed top-0 bottom-0 left-0 bg-backdrop-main animate__animated animate__fadeIn py-12 right-0 z-20 flex flex-col items-center",
          {
            animate__fadeOut: !isShowing,
          }
        )}
      >
        <div
          aria-hidden
          onClick={handleStopPropagation}
          className={classNames("w-full bg-white rounded-md min-w-modal", {
            "max-w-xs": size === "xs",
            "max-w-sm": size === "sm",
            "max-w-md": size === "md",
            "max-w-lg": size === "lg",
          })}
        >
          {children}
        </div>
      </div>
    </AnimationCustom>
  );
};
