import classNames from "classnames";
import React, { ReactNode, useState } from "react";

import { DropdownListWrapper, Portal } from "@/components";
import { useHideOnClickOutside, usePositionPortal } from "@/hooks";

import { AlignedPlacement } from "../../portal/type";

type TListSetting = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  key: string;
  value: string;
};

type TStateOfToggleContent = {
  isShowContent: boolean;
  setIsShowContent: (isShowContent: boolean) => void;
};

type TProps = {
  stateOfToggleContent?: TStateOfToggleContent;
  children: ReactNode;
  listSetting?: TListSetting[];
  widthContainer?: string;
  isOverflow?: boolean;
  renderCustom?: ReactNode;
  placement?: AlignedPlacement;
  onChange?: (item: TListSetting) => void;
};

export const Dropdown: React.FC<TProps> = ({
  listSetting,
  onChange,
  renderCustom,
  children,
  stateOfToggleContent,
  placement = "bottom-left",
  isOverflow = true,
  widthContainer = "320px",
}) => {
  const [_isShowContent, _setIsShowContent] = useState<boolean>(false);

  const isShowContent = stateOfToggleContent
    ? stateOfToggleContent.isShowContent
    : _isShowContent;
  const setIsShowContent = stateOfToggleContent
    ? stateOfToggleContent.setIsShowContent
    : _setIsShowContent;

  const { listRef, displayRef } = useHideOnClickOutside(
    isShowContent,
    setIsShowContent
  );
  const { setPositionList, position } = usePositionPortal<HTMLDivElement>({
    displayRef,
    isPortal: true,
    placement,
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
};
