import classNames from "classnames";
import { forwardRef, ReactNode, useImperativeHandle, useState } from "react";

import { useHideOnClickOutside, usePositionPortal } from "@/hooks";

import { Portal } from "../../portal";
import { AlignedPlacement } from "../../portal/type";
import { TItemListSelect } from "../../select";
import { DropdownListWrapper } from "../dropdown-components";

type TProps = {
  children: ReactNode;
  listSetting?: TItemListSelect[];
  widthContainer?: string;
  isOverflow?: boolean;
  renderCustom?: ReactNode;
  placement?: AlignedPlacement;
  onChange?: (item: TItemListSelect) => void;
};

export type TDropdownMethod = {
  hideDropdown: () => void;
};

// eslint-disable-next-line react/display-name
export const Dropdown = forwardRef<TDropdownMethod, TProps>(
  (
    {
      listSetting,
      onChange,
      renderCustom,
      children,
      placement = "bottom-left",
      isOverflow = true,
      widthContainer = "320px",
    },
    ref
  ) => {
    const [isShowContent, setIsShowContent] = useState<boolean>(false);

    useImperativeHandle(ref, () => ({
      hideDropdown() {
        setIsShowContent(false);
      },
    }));

    const { listRef, displayRef } = useHideOnClickOutside(
      isShowContent,
      setIsShowContent
    );
    const { setPositionList, position } = usePositionPortal<HTMLDivElement>({
      displayRef,
      isPortal: true,
      placement,
      isShowing: isShowContent,
    });

    const handleToggleDropdown = () => {
      setPositionList();
      setIsShowContent((prev) => !prev);
    };
    const handleClickItem = (item: TItemListSelect) => () => {
      onChange && onChange(item);
      setIsShowContent(false);
    };

    return (
      <div className="relative">
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
          <ul ref={listRef}>
            <DropdownListWrapper
              position={position}
              isShowContent={isShowContent}
              widthContainer={widthContainer}
              isOverflow={isOverflow}
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
          </ul>
        </Portal>
      </div>
    );
  }
);
