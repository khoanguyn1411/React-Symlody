/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import classNames from "classnames";
import { ReactNode, useState } from "react";

import { AnimationCustom } from "@/components";

type TProps = {
  children: ReactNode;
  content: string;
  placement?: "bottom" | "top";
};

export const Tooltip: React.FC<TProps> = ({
  children,
  content,
  placement = "bottom",
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleMouseOver = () => {
    setIsActive(true);
  };
  const handleMouseLeave = () => {
    setIsActive(false);
  };
  return (
    <div className="relative">
      <div onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        {children}
      </div>
      <AnimationCustom
        isShowing={isActive}
        className={classNames(
          "bg-black absolute text-white px-2 py-1 rounded-md select-none",
          {
            "-bottom-1 translate-y-full": placement === "bottom",
            "-top-1 -translate-y-full": placement === "top",
          }
        )}
      >
        <h1 className="text-center min-w-max" role="tooltip">
          {content}
        </h1>
      </AnimationCustom>
    </div>
  );
};
