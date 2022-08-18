import classNames from "classnames";
import { ReactNode } from "react";

import { AnimationCustom } from "@/components";

type TProps = {
  isShowContent: boolean;
  children: ReactNode;
  widthContainer?: string;
  isOverflow: boolean;
  position: React.CSSProperties;
};

export const DropdownListWrapper: React.FC<TProps> = ({
  isShowContent,
  children,
  widthContainer = "320px",
  isOverflow,
  position,
}) => {
  return (
    <AnimationCustom
      attrs={{ style: { ...position, width: widthContainer } }}
      isShowing={isShowContent}
      className={classNames(
        "fixed z-10 w-full min-w-max bg-white drop-shadow-lg border border-gray-200 rounded-md mt-2",
        {
          "overflow-auto": isOverflow,
        }
      )}
    >
      {children}
    </AnimationCustom>
  );
};
