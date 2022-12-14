import classNames from "classnames";
import {
  forwardRef,
  ReactNode,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { Portal } from "../../portal";
import { AlignedPlacement } from "../../portal/type";
import { DropdownListWrapper } from "../dropdown-components";

export type TItemListSelect = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  key?: string;
  value: string;
};

type TProps = {
  children: ReactNode;
  listSetting?: TItemListSelect[];
  widthContainer?: string;
  isOverflow?: boolean;
  className?: string;
  renderCustom?: ReactNode;
  placement?: AlignedPlacement;
  onChange?: (item: TItemListSelect) => void;
  onListShow?: () => void;
  onListHidden?: () => void;
};

export type TDropdownMethod = {
  hideDropdown: () => void;
};

// eslint-disable-next-line react/display-name
export const Dropdown = forwardRef<TDropdownMethod, TProps>(
  (
    {
      listSetting,
      className,
      renderCustom,
      children,
      placement = "bottom-left",
      isOverflow = true,
      widthContainer = "320px",
      onChange,
      onListHidden,
      onListShow,
    },
    ref
  ) => {
    const [isShowContent, setIsShowContent] = useState<boolean>(false);
    const displayRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => ({
      hideDropdown() {
        setIsShowContent(false);
      },
    }));

    const handleToggleDropdown = (
      event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      event.stopPropagation();
      setIsShowContent((prev) => !prev);
    };
    const handleClickItem =
      (item: TItemListSelect) =>
      (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        event.stopPropagation();
        onChange && onChange(item);
        setIsShowContent(false);
      };

    useEffect(() => {
      if (isShowContent) {
        onListShow?.();
        return;
      }
      onListHidden?.();
    }, [isShowContent, onListHidden, onListShow]);

    return (
      <div className={classNames("relative", className)}>
        {/* Display */}
        <div
          ref={displayRef}
          role={"menu"}
          onKeyDown={null}
          tabIndex={0}
          onClick={handleToggleDropdown}
          className="w-full cursor-pointer"
        >
          {children}
        </div>
        {/* List */}
        <Portal>
          <DropdownListWrapper
            isShowContent={isShowContent}
            widthContainer={widthContainer}
            isOverflow={isOverflow}
            placement={placement}
            displayRef={displayRef}
            setIsContent={setIsShowContent}
          >
            {renderCustom}
            {!renderCustom &&
              listSetting.map((item) => (
                <li
                  role={"menuitem"}
                  key={item.key}
                  tabIndex={0}
                  onKeyDown={null}
                  onClick={handleClickItem(item)}
                  className={classNames(
                    "py-1 px-2 hover:bg-primary-100 cursor-pointer transition-all duration-70"
                  )}
                >
                  {item.prefix}
                  <h1>{item.value}</h1>
                  {item.suffix}
                </li>
              ))}
          </DropdownListWrapper>
        </Portal>
      </div>
    );
  }
);
