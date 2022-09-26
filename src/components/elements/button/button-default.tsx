import classNames from "classnames";
import React, { memo } from "react";

import { GlobalTypes } from "@/types";
import { FormatService } from "@/utils";

import { BLOCK, SIZE_MAPS, STYLE_MAPS, TPropsButton } from "./types";

const _Button: GlobalTypes.FCPropsWithChildren<TPropsButton> = ({
  onClick,
  className = "",
  children,
  type = "button",
  style = "default",
  size = "default",
  isIconOnly = false,
  block = false,
  prefix = null,
  disable = false,
  isShowLoading = null,
  otherProps,
}) => {
  const handleOnClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (disable) {
      return;
    }
    onClick && onClick(event);
  };
  return (
    <button
      type={type}
      disabled={disable || isShowLoading}
      className={classNames(
        "rounded-md items-center flex min-w-max justify-center transition-all duration-300",
        "text-center font-semibold normal-case",
        className,
        STYLE_MAPS[
          (disable || isShowLoading) && style !== "none" ? "disable" : style
        ],
        SIZE_MAPS[size],
        BLOCK[FormatService.toString(block)],
        {
          "px-3": !isIconOnly,
        }
      )}
      onClick={handleOnClick}
      {...otherProps}
    >
      <i
        className={classNames(
          "fas hidden fa-spinner-third animate-spin transition-all duration-75",
          { "before:hidden mr-0": !isShowLoading, "mr-3": !isIconOnly }
        )}
      />
      {prefix}
      {children}
    </button>
  );
};

export const Button = memo(_Button);
