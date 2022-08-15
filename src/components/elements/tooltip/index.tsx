/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import classNames from "classnames";
import { ReactNode, useRef, useState } from "react";

import { AnimationCustom, Portal } from "@/components";

type TProps = {
  children: ReactNode;
  content: string;
  placement?: "bottom" | "top";
  offset?: number;
};

export type TPosition = {
  left?: number;
  right?: number;
  bottom?: number;
  top?: number;
  width?: number;
};

export const Tooltip: React.FC<TProps> = ({
  children,
  content,
  placement,
  offset = 0,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [coords, setCoords] = useState<TPosition>({ left: 0, top: 0 });
  const refChildren = useRef<HTMLDivElement>(null);

  const handleMouseOver = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const rect = refChildren.current.getBoundingClientRect();
    event.stopPropagation();
    event.preventDefault();
    let leftSide = rect.left + offset;
    leftSide = Math.max(10, leftSide);
    leftSide = Math.min(leftSide, document.body.clientWidth - 10);
    setCoords({
      left: leftSide,
      top: rect.top - 4,
    });
    setIsActive(true);
  };
  const handleMouseLeave = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setIsActive(false);
  };
  return (
    <div>
      <div
        ref={refChildren}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      <Portal>
        <AnimationCustom
          isShowing={isActive}
          attrs={{
            style: {
              top: coords.top,
              left: coords.left,
            },
          }}
          className={classNames(
            `bg-black min-w-max fixed z-20 text-white px-2 py-1 rounded-md select-none`,
            {
              "-translate-y-full": placement === "top",
              "translate-y-full": placement === "bottom",
            }
          )}
        >
          <h1 className="text-center min-w-min" role="tooltip">
            {content}
          </h1>
        </AnimationCustom>
      </Portal>
    </div>
  );
};
