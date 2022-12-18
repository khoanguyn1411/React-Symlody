import classNames from "classnames";
import React, { useLayoutEffect, useRef } from "react";

import { usePositionPortal } from "@/hooks";
import { AppReact } from "@/utils/types";

import { AlignedPlacement } from "../portal/type";

type TProps = {
  displayRef: React.MutableRefObject<HTMLDivElement>;
  placement: AlignedPlacement;
  isActive: boolean;
  space: number;
  setIsActive: AppReact.State.Dispatch<boolean>;
  content: string;
};

export const TooltipContent: React.FC<TProps> = ({
  displayRef,
  placement,
  space,
  isActive,
  content,
}) => {
  const toggleRef = useRef<HTMLDivElement>(null);

  const { setPositionList, position } = usePositionPortal({
    displayRef,
    isPortal: true,
    placement,
    space: space,
    isShowing: isActive,
    toggleRef,
  });

  useLayoutEffect(() => {
    setPositionList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return (
    <div
      style={{ ...position, backgroundColor: "#333" }}
      className={classNames(
        `min-w-max h-[fit-content] fixed z-20 text-white px-2 py-1 rounded-md select-none pointer-events-none`
      )}
      ref={toggleRef}
    >
      <h1 className="text-center min-w-min" role="tooltip">
        {content}
      </h1>
    </div>
  );
};
