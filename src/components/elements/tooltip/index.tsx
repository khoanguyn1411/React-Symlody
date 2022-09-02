import classNames from "classnames";
import { useRef, useState } from "react";

import { AnimationKeepDom, Portal } from "@/components";
import { GlobalTypes } from "@/global";
import { usePositionPortal } from "@/hooks";

import { AlignedPlacement } from "../portal/type";

type TProps = {
  content: string;
  placement?: AlignedPlacement;
};

export const Tooltip: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  content,
  placement = "top-center",
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const refChildren = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLDivElement>(null);

  const { setPositionList, position } = usePositionPortal({
    displayRef: refChildren,
    isPortal: true,
    placement,
    space: 5,
    isShowing: isActive,
    toggleRef,
  });

  const handleMouseEnter = (
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
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {children}
      </div>
      <Portal>
        <AnimationKeepDom
          isShowing={isActive}
          className={classNames(
            `bg-black min-w-max h-[fit-content fixed z-20 text-white px-2 py-1 rounded-md select-none pointer-events-none`
          )}
          attrs={{
            style: position,
          }}
        >
          <div ref={toggleRef}>
            <h1 className="text-center min-w-min" role="tooltip">
              {content}
            </h1>
          </div>
        </AnimationKeepDom>
      </Portal>
    </div>
  );
};
