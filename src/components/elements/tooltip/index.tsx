/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import classNames from "classnames";
import { ReactNode, useRef, useState } from "react";

import { AnimationEffects, Portal } from "@/components";
import { usePositionPortal } from "@/hooks";

import { AlignedPlacement } from "../portal/type";

type TProps = {
  children: ReactNode;
  content: string;
  placement?: AlignedPlacement;
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
  placement = "top-center",
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const refChildren = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  const { setPositionList, getPosition } = usePositionPortal(
    refChildren,
    true,
    placement,
    toggleRef
  );

  const handleMouseOver = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    setPositionList();
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
        <AnimationEffects
          isShowing={isActive}
          className={classNames(
            `bg-black min-w-max h-[fit-content fixed z-20 text-white px-2 py-1 rounded-md select-none`
          )}
          attrs={{
            style: {
              ...getPosition(),
            },
          }}
        >
          <div ref={toggleRef}>
            <h1 className="text-center min-w-min" role="tooltip">
              {content}
            </h1>
          </div>
        </AnimationEffects>
      </Portal>
    </div>
  );
};
