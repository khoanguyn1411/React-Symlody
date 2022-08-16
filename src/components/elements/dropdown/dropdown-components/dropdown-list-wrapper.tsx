import classNames from "classnames";
import { ReactNode } from "react";

import { AnimationCustom } from "@/components";

type Alignment = "start" | "end";
type Side = "top" | "right" | "bottom" | "left";
export type AlignedPlacement = `${Side}-${Alignment}`;

type TProps = {
  isShowContent: boolean;
  children: ReactNode;
  refOfList?: React.Ref<HTMLDivElement>;
  placement?: AlignedPlacement;
  widthContainer?: string;
};

export const DropdownListWrapper: React.FC<TProps> = ({
  isShowContent,
  children,
  widthContainer = "320px",
  placement = "bottom-end",
}) => {
  return (
    <AnimationCustom
      isShowing={isShowContent}
      className={classNames(
        "absolute z-10 w-full min-w-max bg-white overflow-auto drop-shadow-lg border border-gray-200 rounded-md mt-2",
        {
          "top-5 right-0": placement === "bottom-end",
          "top-5 left-0": placement === "bottom-start",
          "bottom-5 left-0": placement === "top-start",
          "bottom-5 right-0": placement === "top-end",
        }
      )}
    >
      <ul style={{ width: widthContainer }}>{children}</ul>
    </AnimationCustom>
  );
};
