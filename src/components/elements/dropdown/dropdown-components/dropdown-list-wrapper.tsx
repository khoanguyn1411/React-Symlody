import classNames from "classnames";
import { forwardRef, ReactNode } from "react";

type Alignment = "start" | "end";
type Side = "top" | "right" | "bottom" | "left";
export type AlignedPlacement = `${Side}-${Alignment}`;

type TProps = {
  isShowContent: boolean;
  children: ReactNode;
  placement?: AlignedPlacement;
};

// eslint-disable-next-line react/display-name
export const DropdownListWrapper = forwardRef<HTMLUListElement, TProps>(
  ({ isShowContent, children, placement = "bottom-end" }, ref) => {
    return (
      <>
        <ul
          ref={ref}
          role="listbox"
          tabIndex={-1}
          className={classNames(
            "absolute z-10 w-full min-w-[200px] bg-white rounded-sm max-h-64 animate__animated animate__fadeIn overflow-auto drop-shadow-lg mt-2",
            {
              "top-6 right-0": placement === "bottom-end",
              "top-6 left-0": placement === "bottom-start",
              "bottom-6 left-0": placement === "top-start",
              "bottom-6 right-0": placement === "top-end",
              animate__fadeOut: !isShowContent,
            }
          )}
        >
          {children}
        </ul>
      </>
    );
  }
);
