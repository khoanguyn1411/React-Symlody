import classNames from "classnames";
import React, { forwardRef, ReactNode } from "react";

type TProps = {
  classNameDisplay?: string;
  style?: "modal" | "default";
  children: ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

// eslint-disable-next-line react/display-name
export const SelectDisplayWrapper = forwardRef<HTMLDivElement, TProps>(
  ({ classNameDisplay, style, children, onClick }, ref) => {
    return (
      <div
        aria-hidden
        onClick={onClick}
        ref={ref}
        className={classNames(
          "flex justify-between w-full items-center p-2 pr-5 rounded-lg text-black",
          classNameDisplay,
          {
            "bg-gray-100 rounded-md": style === "modal",
            "bg-white border border-gray-200": style === "default",
          }
        )}
      >
        {children}
      </div>
    );
  }
);
