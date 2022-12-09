import classNames from "classnames";
import React from "react";

import { GlobalTypes } from "@/utils";

import { AnimationCustom } from "../../animation-custom";
import { TStyle } from "../type";

type TProps = {
  style: TStyle;
  isShowContent: boolean;
  position?: React.CSSProperties;
  isPortal: boolean;
  classNameList?: string;
  isNoPaddingY?: boolean;
};

export const SelectListWrapper: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  // style,
  isShowContent,
  position,
  classNameList,
  isPortal,
  isNoPaddingY = false,
}) => {
  return (
    <AnimationCustom
      attrs={{ style: position }}
      className={classNames(
        "w-full min-w-[fit-content] bg-white border border-gray-200 rounded-md max-h-72 overflow-auto shadow-md mt-2",
        {
          "z-30 fixed": isPortal,
          "z-10 absolute top-8": !isPortal,
          "py-1.5": !isNoPaddingY,
        },
        classNameList
        // STYLE_LIST_WRAPPER_MAPS[style]
      )}
      isShowing={isShowContent}
    >
      {children}
    </AnimationCustom>
  );
};
