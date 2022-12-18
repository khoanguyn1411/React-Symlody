import { memo, useRef, useState } from "react";

import { AppReact } from "@/utils/types";

import { AnimationCustom } from "../animation-custom";
import { Portal } from "../portal";
import { AlignedPlacement } from "../portal/type";
import { TooltipContent } from "./TooltipContent";

type TProps = {
  content: string;
  placement?: AlignedPlacement;
  className?: string;
  space?: number;
};

const _Tooltip: AppReact.FC.PropsWithChildren<TProps> = ({
  children,
  content,
  className,
  placement = "top-center",
  space = 5,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const refChildren = useRef<HTMLDivElement>(null);

  const handleMouseEnter = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
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
        <AnimationCustom isShowing={isActive} className="fixed z-30">
          <TooltipContent
            displayRef={refChildren}
            placement={placement}
            isActive={isActive}
            space={space}
            setIsActive={setIsActive}
            content={content}
          />
        </AnimationCustom>
      </Portal>
    </>
  );
};

export const Tooltip = memo(_Tooltip);
