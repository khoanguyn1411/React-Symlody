// Replace onMouseEnter with onMouseOver and onMouseLeave with onMouseOut because the strange behavior of onMouseLeave and onMouseOver
// (they sometimes not trigger the event).
/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import classNames from "classnames";

import { GlobalTypes } from "@/utils";

type TProps = {
  zIndex: number;
  className?: string;
  onClick?: GlobalTypes.ReactButtonCommonEvents;
  onMouseOver?: GlobalTypes.ReactButtonCommonEvents;
  onMouseOut?: GlobalTypes.ReactButtonCommonEvents;
};

export const TodoCircleBorderWrapper: GlobalTypes.FCPropsWithChildren<
  TProps
> = ({ children, zIndex, onClick, onMouseOver, onMouseOut, className }) => {
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
        {children}
      </button>
    </div>
  );
};
