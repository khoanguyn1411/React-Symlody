import classNames from "classnames";
import React, { useRef, useState } from "react";

import { useHideOnClickOutside, usePositionPortal } from "@/hooks";
import { GlobalTypes } from "@/utils";

import { Portal } from "../../portal";
import { SelectDisplayWrapper } from "../select-components";
import { SelectListWrapper } from "../select-components/SelectListWrapper";
import { TSelectCustomProps } from "../type";

export const SelectBase: GlobalTypes.FCPropsWithChildren<
  TSelectCustomProps
> = ({
  classNameDisplay,
  classNameList,
  renderListItem,
  style = "default",
  isShowArrow = false,
  isPortal = true,
  children,
  placement = "bottom-left",
  isNoPaddingY = false,
  isShowContent = false,
  wrapperSelectRef,
  isNonePadding = false,
  maxHeight,
  setIsShowContent,
}) => {
  let _isShowContent: boolean,
    _setIsShowContent: GlobalTypes.ReactStateAction<boolean>;

  if (isShowContent != null && setIsShowContent != null) {
    _isShowContent = isShowContent;
    _setIsShowContent = setIsShowContent;
  } else {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isShowContent, setIsShowContent] = useState<boolean>(false);
    _isShowContent = isShowContent;
    _setIsShowContent = setIsShowContent;
  }

  const iconRef = useRef(null);

  const { listRef, displayRef } = useHideOnClickOutside(
    _isShowContent,
    _setIsShowContent
  );

  const { setPositionList, position } = usePositionPortal({
    displayRef,
    isPortal,
    isShowing: _isShowContent,
    placement: placement,
    spaceAdditionalTop: 10,
  });
  const handleToggleContent = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (!wrapperSelectRef || !wrapperSelectRef.current) {
      const elementDisplay = displayRef?.current;
      const elementIcon = iconRef?.current;
      if (elementIcon) {
        if (
          !elementDisplay.contains(e.target as Node) &&
          !elementIcon.contains(e.target)
        ) {
          return;
        }
        setPositionList();
        _setIsShowContent(!_isShowContent);
      }

      if (!elementDisplay.contains(e.target as Node)) {
        return;
      }
      setPositionList();
      _setIsShowContent(!_isShowContent);
      return;
    }
    const elementWrapperSelect = wrapperSelectRef?.current;
    const elementDisplay = displayRef?.current;
    const elementIcon = iconRef?.current;
    if (
      elementWrapperSelect !== e.target &&
      elementDisplay != e.target &&
      !elementIcon.contains(e.target)
    ) {
      return;
    }
    setPositionList();
    setIsShowContent(!isShowContent);
  };
  const ListComponent: JSX.Element = (
    <ul ref={listRef}>
      <SelectListWrapper
        maxHeight={maxHeight}
        isPortal={isPortal}
        isNoPaddingY={isNoPaddingY}
        position={position}
        style={style}
        classNameList={classNameList}
        isShowContent={_isShowContent}
      >
        {renderListItem}
      </SelectListWrapper>
    </ul>
  );

  return (
    <div className="relative flex items-center cursor-pointer">
      {/* Display */}
      <SelectDisplayWrapper
        isNonePadding={isNonePadding}
        ref={displayRef}
        classNameDisplay={classNameDisplay}
        onClick={handleToggleContent}
        aria-hidden
        style={style}
      >
        {children}
        {isShowArrow && (
          <span
            ref={iconRef}
            className={classNames(
              "ml-2 text-gray-400 flex mt-2 items-center justify-center duration-300 transition-transform text-base",
              {
                "mb-2 mt-0": !_isShowContent,
              }
            )}
          >
            <i
              className={classNames("fas", {
                "fa-sort-up": _isShowContent,
                "fa-sort-down": !_isShowContent,
              })}
            />
          </span>
        )}
      </SelectDisplayWrapper>
      {/* List */}
      {isPortal && <Portal>{ListComponent}</Portal>}
      {!isPortal && ListComponent}
    </div>
  );
};
