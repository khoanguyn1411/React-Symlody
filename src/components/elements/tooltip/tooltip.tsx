import classNames from "classnames";
import { useLayoutEffect, useRef, useState } from "react";

import { AnimationKeepDom, Portal } from "@/components";
import { usePositionPortal } from "@/hooks";
import { GlobalTypes } from "@/types";

import { AlignedPlacement } from "../portal/type";

type TProps = {
  content: string;
  placement?: AlignedPlacement;
  className?: string;
};

export const Tooltip: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  content,
  className,
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

  useLayoutEffect(() => {
    setPositionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

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
    <>
      <div
        className={className}
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
    </>
  );
};
