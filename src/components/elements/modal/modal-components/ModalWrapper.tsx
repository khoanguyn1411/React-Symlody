import classNames from "classnames";
import React, { ReactNode, useEffect } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { AnimationCustom } from "../../animation-custom";
import { Portal } from "../../portal";
import { TPropsModalGeneral } from "../types";

type TProps = {
  children: ReactNode;
};
export const ModalWrapper: React.FC<TPropsModalGeneral & TProps> = ({
  isShowing,
  toggle,
  closeWhenClickOutside = true,
  children,
  reset,
  // size = "lg",
  widthContainer = 560,
}) => {
  const handleCloseWhenClickOutside = () => {
    if (closeWhenClickOutside) {
      toggle.setToggle();
      reset && reset();
    }
  };
  const handleStopPropagation = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    closeWhenClickOutside && event.stopPropagation();
  };

  useHotkeys("esc", () => {
    toggle.setHidden();
  });

  useEffect(() => {
    if (!isShowing) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
  }, [isShowing]);

  return (
    <div aria-hidden onClick={handleCloseWhenClickOutside}>
      <Portal>
        <AnimationCustom
          isShowing={isShowing}
          className={classNames(
            "fixed top-0 bottom-0 left-0 bg-backdrop-main py-12 right-0 z-20 flex flex-col items-center"
          )}
        >
          <div
            aria-hidden
            onClick={handleStopPropagation}
            className={classNames(
              "w-full drop-shadow-2xl bg-white rounded-md min-w-modal"
              // {
              //   "max-w-xs": size === "xs",
              //   "max-w-sm": size === "sm",
              //   "max-w-md": size === "md",
              //   "max-w-lg": size === "lg",
              // }
            )}
            style={{ width: "calc(100vw - 80px)", maxWidth: widthContainer }}
          >
            {children}
          </div>
        </AnimationCustom>
      </Portal>
    </div>
  );
};
