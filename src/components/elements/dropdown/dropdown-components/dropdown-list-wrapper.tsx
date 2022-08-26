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
        "fixed z-10 w-full min-w-max drop-shadow-lg rounded-md mt-2",
        "border border-gray-200 bg-white",
        {
          "overflow-auto": isOverflow,
        }
      )}
    >
      {children}
    </AnimationCustom>
  );
};
