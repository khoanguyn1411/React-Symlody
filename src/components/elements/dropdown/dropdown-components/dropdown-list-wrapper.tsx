import classNames from "classnames";

import { AnimationCustom } from "@/components";
import { GlobalTypes } from "@/global";

type TProps = {
  isShowContent: boolean;
  widthContainer?: string;
  isOverflow: boolean;
  position: React.CSSProperties;
};

export const DropdownListWrapper: GlobalTypes.FCPropsWithChildren<TProps> = ({
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
        "w-full min-w-max",
        "bg-white",
        "drop-shadow-lg",
        "border border-gray-200",
        "rounded-md",
        "mt-2",
        "fixed z-10",
        {
          "overflow-auto": isOverflow,
        }
      )}
    >
      {children}
    </AnimationCustom>
  );
};
