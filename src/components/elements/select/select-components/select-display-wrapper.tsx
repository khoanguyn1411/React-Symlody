import classNames from "classnames";
import React, { forwardRef, memo, ReactNode } from "react";

import {
  STYLE_DISPLAY_WRAPPER_MAPS,
  TSelectGeneralProps,
  TStyle,
} from "../type";

type TProps = {
  classNameDisplay?: TSelectGeneralProps["classNameDisplay"];
  style?: TStyle;
  children: ReactNode;
  isNonePadding?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

// eslint-disable-next-line react/display-name
const _SelectDisplayWrapper = forwardRef<HTMLDivElement, TProps>(
  (
    { classNameDisplay, style, isNonePadding = false, children, onClick },
    ref
  ) => {
    return (
      <div
        role={"listbox"}
        onClick={onClick}
        onKeyDown={null}
        tabIndex={0}
        ref={ref}
        className={classNames(
          "flex justify-between w-full items-center rounded-lg text-black",
          classNameDisplay,
          !isNonePadding && "p-2 pr-5",
          STYLE_DISPLAY_WRAPPER_MAPS[style]
        )}
      >
        {children}
      </div>
    );
  }
);

export const SelectDisplayWrapper = memo(_SelectDisplayWrapper);
