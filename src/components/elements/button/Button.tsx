import classNames from "classnames";
import React from "react";

import { AppReact } from "@/utils/types";

import { BLOCK, SIZE_MAPS, STYLE_MAPS, TPropsButton } from "./types";

export const Button: AppReact.FC.PropsWithChildren<TPropsButton> = ({
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
        BLOCK[block.toString()],
        {
          "px-3": !isIconOnly,
          "cursor-not-allowed": disable,
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
