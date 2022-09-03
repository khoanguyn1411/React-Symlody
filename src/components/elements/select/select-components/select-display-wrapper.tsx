import classNames from "classnames";
import React, { forwardRef, ReactNode } from "react";

import {
  STYLE_DISPLAY_WRAPPER_MAPS,
  TSelectGeneralProps,
  TStyle,
} from "../type";

type TProps = {
  classNameDisplay?: TSelectGeneralProps["classNameDisplay"];
  style?: TStyle;
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

// eslint-disable-next-line react/display-name
export const SelectDisplayWrapper = forwardRef<HTMLDivElement, TProps>(
  ({ classNameDisplay, style, children, onClick }, ref) => {
    return (
      <div
        role={"listbox"}
        onClick={onClick}
        onKeyDown={null}
        tabIndex={0}
        ref={ref}
        className={classNames(
          "flex justify-between w-full items-center p-2 pr-5 rounded-lg text-black",
          classNameDisplay,
          STYLE_DISPLAY_WRAPPER_MAPS[style]
        )}
      >
        {children}
      </div>
    );
  }
);
