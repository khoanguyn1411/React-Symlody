import classNames from "classnames";
import React from "react";

import { GlobalTypes } from "@/utils";

import { AnimationKeepDom } from "../../animation-custom";
import { TStyle } from "../type";

type TProps = {
  style: TStyle;
  isShowContent: boolean;
  position?: React.CSSProperties;
  isPortal: boolean;
  classNameList?: string;
  isNoPaddingY?: boolean;
  maxHeight?: number;
  toggleRef?: React.MutableRefObject<HTMLDivElement>;
};

export const SelectListWrapper: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  // style,
  isShowContent,
  position,
  classNameList,
  maxHeight = 200,
  isPortal,
  isNoPaddingY = false,
}) => {
  return (
    <AnimationKeepDom
      attrs={{ style: { ...position, maxHeight: maxHeight } }}
      className={classNames(
        "w-full min-w-[fit-content] bg-white border border-gray-200 rounded-md overflow-auto shadow-md mt-2",
        {
          "z-30 fixed": isPortal,
          "z-10 absolute top-11 left-0": !isPortal,
          "py-1.5": !isNoPaddingY,
        },
        classNameList
        // STYLE_LIST_WRAPPER_MAPS[style]
      )}
      isShowing={isShowContent}
    >
      {children}
    </AnimationKeepDom>
  );
};
