import classNames from "classnames";
import React, { ReactNode } from "react";
import { useHotkeys } from "react-hotkeys-hook";

import { AppReact } from "@/utils/types";

import { AnimationCustom } from "../animation-custom";
import { Button } from "../button";
import { TToggleModal } from "../modal/types";
import { Portal } from "../portal";

type Props = {
  closeWhenClickOutside?: boolean;
  toggle: TToggleModal;
  isShowing: boolean;
  widthContainer?: string;
  title: ReactNode;
};

export const Dialog: AppReact.FC.PropsWithChildren<Props> = ({
  closeWhenClickOutside = true,
  toggle,
  title,
  isShowing,
  widthContainer = "320px",
  children,
}) => {
  const handleCloseWhenClickOutside = () => {
    if (closeWhenClickOutside) {
      toggle.setToggle();
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

  const handleCloseDialog = () => {
    toggle.setHidden();
  };

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
              "w-full drop-shadow-2xl bg-white gap-2 flex flex-col rounded-md min-w-modal"
            )}
            style={{ width: "calc(100vw - 80px)", maxWidth: widthContainer }}
          >
            <div className="flex justify-between p-3 border-b">
              <span>{title}</span>
              <button onClick={handleCloseDialog}>
                <i className="fas fa-times" />
              </button>
            </div>
            <div className="px-3 py-2">{children}</div>
            <div className="flex justify-end w-full p-3 border-t">
              <Button onClick={handleCloseDialog} className="w-20">
                OK
              </Button>
            </div>
          </div>
        </AnimationCustom>
      </Portal>
    </div>
  );
};
