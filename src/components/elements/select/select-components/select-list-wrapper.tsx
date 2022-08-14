import classNames from "classnames";
import React, { ReactNode } from "react";

import { AnimationCustom, TPosition } from "@/components";

type TProps = {
  children: ReactNode;
  style: "modal" | "default";
  isShowContent: boolean;
  coords?: TPosition;
};

export const SelectListWrapper: React.FC<TProps> = ({
  children,
  style,
  isShowContent,
  coords,
}) => {
  return (
    <AnimationCustom
      attrs={{
        style: {
          top: coords && coords.top,
          left: coords && coords.left,
          width: coords && coords.right,
        },
      }}
      className={classNames(
        "z-30 fixed w-full py-1 rounded-md max-h-64 overflow-auto shadow-md mt-2",
        {
          "bg-white": style === "default",
          "bg-grey-100 ": style === "modal",
        }
      )}
      isShowing={isShowContent}
    >
      {children}
    </AnimationCustom>
  );
};
