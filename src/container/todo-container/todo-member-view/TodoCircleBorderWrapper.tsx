// Replace onMouseEnter with onMouseOver and onMouseLeave with onMouseOut because the strange behavior of onMouseLeave and onMouseOver
// (they sometimes not trigger the event).
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import classNames from "classnames";

import { AppReact } from "@/utils/types";

type TProps = {
  zIndex: number;
  className?: string;
  onClick?: AppReact.Button.EventHandler;
  onMouseOver?: AppReact.Button.EventHandler;
  onMouseOut?: AppReact.Button.EventHandler;
};

export const TodoCircleBorderWrapper: AppReact.FC.PropsWithChildren<TProps> = ({
  children,
  zIndex,
  onClick,
  onMouseOver,
  onMouseOut,
  className,
}) => {
  return (
    <div className="group" style={{ zIndex: zIndex }}>
      <button
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        onClick={onClick}
        className={classNames(
          "rounded-full cursor-pointer border-2",
          className
        )}
      >
        <span className="block bg-white border border-white rounded-full h-[fit-content]">
          {children}
        </span>
      </button>
    </div>
  );
};
