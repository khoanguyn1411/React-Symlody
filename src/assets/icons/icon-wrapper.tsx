import classNames from "classnames";
import React from "react";

import { COLOR_MAPS_ICON, SIZE_MAPS_ICON, TIconWrapperProps } from "./type";

export const SvgWrapper: React.FC<TIconWrapperProps> = ({
  className,
  size = "default",
  customColor = "default",
  children,
  ...props
}) => {
  return (
    <svg
      className={classNames(
        SIZE_MAPS_ICON[size],
        COLOR_MAPS_ICON[customColor],
        className
      )}
      {...props}
    >
      {children}
    </svg>
  );
};
