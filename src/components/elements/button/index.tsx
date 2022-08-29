import classNames from "classnames";
import React, { ReactNode } from "react";

import { BLOCK, SIZE_MAPS, STYLE_MAPS } from "./types";

type TProps = {
  className?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  isIconOnly?: boolean;
  prefix?: ReactNode | null;
  isShowLoading?: boolean | null;
  style?: keyof typeof STYLE_MAPS;
  size?: keyof typeof SIZE_MAPS;
  disable?: boolean;
  block?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export const Button: React.FC<TProps> = ({
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
      disabled={disable}
      className={classNames(
        "rounded-md items-center min-w-max justify-center transition-all duration-300",
        "text-center font-semibold normal-case",
        className,
        STYLE_MAPS[disable ? "disable" : style],
        SIZE_MAPS[size],
        BLOCK[block.toString()],
        {
          "px-3": !isIconOnly,
        }
      )}
      onClick={handleOnClick}
    >
      <i
        className={classNames(
          "mr-3 fas hidden fa-spinner-third animate-spin transition-all duration-75",
          { "before:hidden mr-0": !isShowLoading }
        )}
      />
      {prefix}
      {children}
    </button>
  );
};
