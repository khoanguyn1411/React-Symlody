import React, { ReactNode } from "react";

import { Portal } from "@/components";
import { useHideOnClickOutside, usePositionPortal } from "@/hooks";

import { TSelectGeneralProps, TStyle } from "../type";
import { SelectDisplayWrapper, SelectListWrapper } from ".";

type TProps = {
  isShowContent: boolean;
  style: TStyle;
  classNameDisplay?: TSelectGeneralProps["classNameDisplay"];
  className?: TSelectGeneralProps["className"];
  displayElement: ReactNode;
  children: ReactNode;
  isPortal: TSelectGeneralProps["isPortal"];
  setIsShowContent: (isShowContent: boolean) => void;
};

export const SelectGeneral: React.FC<TProps> = ({
  isShowContent,
  style,
  classNameDisplay,
  className,
  displayElement,
  children,
  isPortal,
  setIsShowContent,
}) => {
  const { listRef, displayRef } = useHideOnClickOutside(
    isShowContent,
    setIsShowContent
  );
  const { coords, setPositionList } = usePositionPortal<HTMLDivElement>(
    displayRef,
    isPortal
  );

  const handleToggleContent = () => {
    setPositionList();
    setIsShowContent(!isShowContent);
  };

  return (
    <div className={className}>
      <div className="relative cursor-pointer">
        {/* Display */}
        <SelectDisplayWrapper
          classNameDisplay={classNameDisplay}
          style={style}
          ref={displayRef}
          onClick={handleToggleContent}
        >
          {displayElement}
        </SelectDisplayWrapper>
        {/* List */}
        {isPortal && (
          <Portal>
            <ul ref={listRef}>
              <SelectListWrapper
                isPortal={isPortal}
                coords={isPortal && coords}
                isShowContent={isShowContent}
                style={style}
              >
                {children}
              </SelectListWrapper>
            </ul>
          </Portal>
        )}
        {!isPortal && (
          <ul ref={listRef}>
            <SelectListWrapper
              isPortal={isPortal}
              isShowContent={isShowContent}
              style={style}
            >
              {children}
            </SelectListWrapper>
          </ul>
        )}
      </div>
    </div>
  );
};
