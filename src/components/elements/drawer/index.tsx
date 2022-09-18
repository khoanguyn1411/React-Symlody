import classNames from "classnames";
import ReactDrawer from "rc-drawer";
import { useMemo } from "react";

import { BREAKPOINTS } from "@/constants";
import useWindowSize from "@/hooks/useWindowSize";

interface IProps {
  title?: string;
  subTitle?: string | JSX.Element;
  right?: JSX.Element;
  visible: boolean;
  placement?: "left" | "right";
  level?: string;
  width?: string | number;
  onClose: () => void;
  afterVisibleChange?: (visible: boolean) => void;
  footer?: JSX.Element;
  id?: string;
  shouldResponsive?: boolean;
  className?: string;
  isBackdropBlur?: boolean;
  children: React.ReactNode;
}

const Header = ({ title, subTitle, right, onClose, level }) => (
  <div className="flex flex-row items-center px-6 border-b h-14">
    {level && (
      <button
        onClick={onClose}
        className="inline-block pl-6 pr-6 -ml-6 text-lg text-gray-300 outline-none focus:outline-none hover:text-gray-400 transition-all duration-300"
      >
        <i className="fas fa-chevron-left" />
      </button>
    )}

    <div
      className={classNames(
        "flex items-baseline flex-1 overflow-hidden",
        "md:space-x-4",
        "flex-col md:flex-row"
      )}
    >
      <h3 className="text-base font-medium leading-normal">{title}</h3>

      {subTitle && (
        <div className="flex-1 text-xs truncate md:text-sm">
          <span className="text-gray-400 truncate">{subTitle}</span>
        </div>
      )}
    </div>

    <div className="flex items-center ml-2">
      {right && <div>{right}</div>}

      <button
        className="flex items-center h-8 pl-4 text-lg text-gray-300 outline-none cursor-pointer hover:text-gray-400 focus:outline-none transition-all duration-300"
        onClick={onClose}
      >
        <i className="fas fa-times" />
      </button>
    </div>
  </div>
);

export const Drawer: React.FC<IProps> = ({
  title,
  subTitle,
  right,
  visible,
  children,
  footer,
  onClose,
  afterVisibleChange,
  placement = "right",
  level,
  width = "768px",
  id,
  shouldResponsive = true,
  className,
  isBackdropBlur = true,
}) => {
  const windowSize = useWindowSize();

  const headerHeight = title ? 56 : 0;
  const footerHeight = footer ? 64 : 0;
  const maxHeight = `calc(100vh - ${headerHeight + footerHeight}px)`;

  const drawerWidth = useMemo(() => {
    if (!shouldResponsive) {
      return width;
    }

    if (windowSize.width >= BREAKPOINTS.xl) {
      return width;
    }

    if (windowSize.width >= BREAKPOINTS.md) {
      return "calc(100vw - 32px)";
    }

    return "100vw";
  }, [shouldResponsive, width, windowSize?.width]);

  const props = !level
    ? {
        getContainer: null,
      }
    : {};

  return (
    <ReactDrawer
      open={visible}
      onClose={onClose}
      handler={false}
      width={drawerWidth}
      placement={placement}
      id={id}
      level={level}
      levelMove={32}
      afterVisibleChange={afterVisibleChange}
      className={classNames(className, {
        "drawer-mask-blur": isBackdropBlur,
      })}
      {...props}
    >
      {title && (
        <Header
          title={title}
          subTitle={subTitle}
          right={right}
          onClose={onClose}
          level={level}
        />
      )}

      <div
        className="px-6 py-4 overflow-auto overflow-x-hidden"
        style={{ height: maxHeight }}
      >
        {children}
      </div>

      {footer && (
        <div className="flex items-center h-16 px-6 py-4 overflow-hidden border-t">
          {footer}
        </div>
      )}
    </ReactDrawer>
  );
};
