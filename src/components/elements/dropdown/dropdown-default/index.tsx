import classNames from "classnames";
import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  useState,
} from "react";

import { DropdownListWrapper, Portal } from "@/components";
import { useHideOnClickOutside, usePositionPortal } from "@/hooks";

import { AlignedPlacement } from "../../portal/type";

type TListSetting = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  key: string;
  value: string;
};

type TProps = {
  children: ReactNode;
  listSetting?: TListSetting[];
  widthContainer?: string;
  isOverflow?: boolean;
  renderCustom?: ReactNode;
  placement?: AlignedPlacement;
  onChange?: (item: TListSetting) => void;
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
      setIsShowContent(!isShowContent);
    };
    const handleClickItem = (item: TListSetting) => () => {
      onChange && onChange(item);
      setIsShowContent(false);
    };

    return (
      <div className="relative">
        {/* Display */}
        <div
          aria-hidden
          ref={displayRef}
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
                listSetting.map((item, index: number) => (
                  <li
                    key={index}
                    aria-hidden="true"
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
