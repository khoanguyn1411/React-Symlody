import classNames from "classnames";
import React, { useRef, useState } from "react";

import { useHideOnClickOutside, usePositionPortal } from "@/hooks";
import { GlobalTypes } from "@/utils";

import { Portal } from "../../portal";
import { SelectDisplayWrapper } from "../select-components";
import { SelectListWrapper } from "../select-components/SelectListWrapper";
import { TSelectCustomProps } from "../type";

export const SelectCustom: GlobalTypes.FCPropsWithChildren<
  TSelectCustomProps
> = ({
  classNameList,
  renderListItem,
  style = "default",
  isShowArrow = false,
  isPortal = true,
  children,
  placement = "bottom-left",
  isNoPaddingY,
}) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);

  const iconRef = useRef(null);

  const { listRef, displayRef } = useHideOnClickOutside(
    isShowContent,
    setIsShowContent
  );
  const { setPositionList, position } = usePositionPortal({
    displayRef,
    isPortal,
    isShowing: isShowContent,
    placement: placement,
  });
  const handleToggleContent = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const elementDisplay = displayRef?.current;
    const elementIcon = iconRef?.current;

    const isEventContainIcon = elementIcon && !elementIcon.contains(e.target);

    if (elementDisplay != e.target && isEventContainIcon) {
      return;
    }
    setPositionList();
    setIsShowContent(!isShowContent);
  };
  const ListComponent: JSX.Element = (
    <ul ref={listRef}>
      <SelectListWrapper
        isPortal={isPortal}
        isNoPaddingY={isNoPaddingY}
        position={position}
        style={style}
        classNameList={classNameList}
        isShowContent={isShowContent}
      >
        <div className="bg-white">{renderListItem}</div>
      </SelectListWrapper>
    </ul>
  );

  return (
    <div>
      <div className="relative cursor-pointer">
        {/* Display */}
        <SelectDisplayWrapper
          ref={displayRef}
          onClick={handleToggleContent}
          aria-hidden="true"
          style={style}
        >
          {children}
          {isShowArrow && (
            <span ref={iconRef}>
              <i
                className={classNames(
                  "fas fa-angle-down duration-300 -mr-5 transition-transform text-base",
                  {
                    "transform -rotate-180": isShowContent,
                  }
                )}
              />
            </span>
          )}
        </SelectDisplayWrapper>
        {/* List */}
        {isPortal && <Portal>{ListComponent}</Portal>}
        {!isPortal && ListComponent}
      </div>
    </div>
  );
};
