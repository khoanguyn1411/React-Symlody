import classNames from "classnames";
import { forwardRef, ReactNode } from "react";

import { AnimationCustom } from "@/components";

type Alignment = "start" | "end";
type Side = "top" | "right" | "bottom" | "left";
export type AlignedPlacement = `${Side}-${Alignment}`;

type TProps = {
  isShowContent: boolean;
  children: ReactNode;
  placement?: AlignedPlacement;
};

// eslint-disable-next-line react/display-name
export const DropdownListWrapper = forwardRef<HTMLDivElement, TProps>(
  ({ isShowContent, children, placement = "bottom-end" }, ref) => {
    return (
      <AnimationCustom
        isShowing={isShowContent}
        ref={ref}
        className={classNames(
          "absolute z-10 w-full min-w-[200px] bg-white rounded-sm max-h-64 overflow-auto drop-shadow-lg mt-2",
          {
            "top-5 right-0": placement === "bottom-end",
            "top-5 left-0": placement === "bottom-start",
            "bottom-5 left-0": placement === "top-start",
            "bottom-5 right-0": placement === "top-end",
          }
        )}
      >
        <ul>{children}</ul>
      </AnimationCustom>
    );
  }
);
