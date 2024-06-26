import classNames from "classnames";
import React, { forwardRef, ReactNode } from "react";

import { STYLE_DISPLAY_WRAPPER_MAPS, TStyle } from "../type";

type TProps = {
  classNameDisplay?: string;
  style?: TStyle;
  children: ReactNode;
  isNonePadding?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

// eslint-disable-next-line react/display-name
export const SelectDisplayWrapper = forwardRef<HTMLDivElement, TProps>(
  (
    { classNameDisplay, style, isNonePadding = false, children, onClick },
    ref
  ) => {
    const _style =
      style !== "none"
        ? classNames(
            "flex justify-between w-full items-center rounded-lg text-black focus:ring-primary-800 focus:ring-1",
            classNameDisplay,
            !isNonePadding && "p-2 pr-5",
            STYLE_DISPLAY_WRAPPER_MAPS[style]
          )
        : classNameDisplay;
    return (
      <div
        role={"listbox"}
        onClick={onClick}
        onKeyDown={null}
        tabIndex={0}
        ref={ref}
        className={_style}
      >
        {children}
      </div>
    );
  }
);
