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
    // Replace onMouseEnter with onMouseOver and onMouseLeave with onMouseOut because the strange behavior of onMouseLeave and onMouseOver
    // (they sometimes not trigger the event).
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <button
      style={{ zIndex: zIndex }}
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onClick={onClick}
      className={classNames(
        "border-white rounded-full cursor-pointer border-[1.8px] ",
        className
      )}
    >
      {children}
    </button>
  );
};
