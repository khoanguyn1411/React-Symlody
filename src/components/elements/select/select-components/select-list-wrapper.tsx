import classNames from "classnames";
import React, { ReactNode } from "react";

import { AnimationCustom, TPosition } from "@/components";

import { getPosition } from "../../portal/util";
import { STYLE_LIST_WRAPPER_MAPS, TSelectGeneralProps, TStyle } from "../type";

type TProps = {
  children: ReactNode;
  style: TStyle;
  isShowContent: boolean;
  coords?: TPosition;
  isPortal: TSelectGeneralProps["isPortal"];
};

export const SelectListWrapper: React.FC<TProps> = ({
  children,
  style,
  isShowContent,
  coords,
  isPortal,
}) => {
  return (
    <AnimationCustom
      attrs={{ style: getPosition("bottom-left", coords) }}
      className={classNames(
        "w-full rounded-md max-h-40 overflow-auto shadow-md mt-2",
        {
          "z-30 fixed": isPortal,
          "z-10 absolute top-8": !isPortal,
        },
        STYLE_LIST_WRAPPER_MAPS[style]
      )}
      isShowing={isShowContent}
    >
      {children}
    </AnimationCustom>
  );
};
