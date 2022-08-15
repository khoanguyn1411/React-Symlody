import classNames from "classnames";
import React, { ReactNode } from "react";

import { AnimationCustom, TPosition } from "@/components";

type TProps = {
  children: ReactNode;
  style: "modal" | "default";
  isShowContent: boolean;
  coords?: TPosition;
  isPortal?: boolean;
};

export const SelectListWrapper: React.FC<TProps> = ({
  children,
  style,
  isShowContent,
  coords,
  isPortal,
}) => {
  const getPropsAttrs = () => {
    if (!isPortal) {
      return;
    }
    return {
      style: {
        top: coords && coords.top,
        left: coords && coords.left,
        width: coords && coords.width,
      },
    };
  };
  return (
    <AnimationCustom
      attrs={getPropsAttrs()}
      className={classNames(
        "w-full rounded-md max-h-40 overflow-auto shadow-md mt-2",
        {
          "z-30 fixed": isPortal,
          "z-10 absolute top-8": !isPortal,
        },
        {
          "bg-white": style === "default",
          "bg-gray-50": style === "modal",
        }
      )}
      isShowing={isShowContent}
    >
      {children}
    </AnimationCustom>
  );
};
