import React, { ReactNode, useEffect, useRef, useState } from "react";

import { Portal, TPosition } from "@/components";

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
  const listRef = useRef<HTMLUListElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<TPosition>({
    left: 0,
    top: 0,
    width: 0,
  });

  useEffect(() => {
    const elementList = listRef?.current;
    const elementDisplay = displayRef?.current;
    if (!elementList || !elementDisplay) return;
    const handleCloseListDiv = (event: Event) => {
      if (
        !elementList.contains(event.target as Node) &&
        !elementDisplay.contains(event.target as Node)
      ) {
        setIsShowContent(false);
      }
    };
    window.addEventListener("click", handleCloseListDiv, true);
    return () => {
      window.removeEventListener("click", handleCloseListDiv, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowContent]);
  const setPositionList = () => {
    if (!displayRef.current || !isPortal) {
      return;
    }
    const rect = displayRef.current.getBoundingClientRect();
    let leftSide = rect.left;
    leftSide = Math.max(10, leftSide);
    leftSide = Math.min(leftSide, document.body.clientWidth - rect.width - 10);
    setCoords({
      left: leftSide,
      top: rect.bottom,
      width: rect.right - rect.left,
    });
  };
  const handleToggleContent = () => {
    setPositionList();
    setIsShowContent(!isShowContent);
  };

  useEffect(() => {
    window.addEventListener("scroll", setPositionList, true);
    window.addEventListener("resize", setPositionList, true);
    return () => {
      window.removeEventListener("scroll", setPositionList, true);
      window.removeEventListener("resize", setPositionList, true);
    };
  }, []);

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
