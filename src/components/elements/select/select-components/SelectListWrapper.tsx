import classNames from "classnames";
import React, { memo } from "react";

import { AnimationCustom } from "@/components";
import { GlobalTypes } from "@/utils";

import { STYLE_LIST_WRAPPER_MAPS, TSelectGeneralProps, TStyle } from "../type";

type TProps = {
  style: TStyle;
  isShowContent: boolean;
  position?: React.CSSProperties;
  isPortal: TSelectGeneralProps["isPortal"];
};

const _SelectListWrapper: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  style,
  isShowContent,
  position,
  isPortal,
}) => {
  return (
    <AnimationCustom
      attrs={{ style: position }}
      className={classNames(
        "w-full rounded-md max-h-40 py-1.5 overflow-auto shadow-md mt-2",
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

export const SelectListWrapper = memo(_SelectListWrapper);
