import React, { ReactNode, useEffect, useRef, useState } from "react";

import { Portal, TPosition } from "@/components";

import { SelectDisplayWrapper, SelectListWrapper } from ".";

type TProps = {
  isShowContent: boolean;
  style?: "modal" | "default";
  classNameDisplay?: string;
  className?: string;
  displayElement: ReactNode;
  children: ReactNode;
  setIsShowContent: React.Dispatch<React.SetStateAction<boolean>>;
};

export const SelectGeneral: React.FC<TProps> = ({
  isShowContent,
  style,
  classNameDisplay,
  className,
  displayElement,
  children,
  setIsShowContent,
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  const displayRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState<TPosition>({ left: 0, top: 0 });

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
    const rect = displayRef.current?.getBoundingClientRect();
    let leftSide = rect.left;
    leftSide = Math.max(10, leftSide);
    leftSide = Math.min(leftSide, document.body.clientWidth - rect.width - 10);
    setCoords({
      left: leftSide,
      right: rect.right - rect.left,
      top: rect.bottom,
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
        <Portal>
          <ul ref={listRef}>
            <SelectListWrapper
              coords={coords}
              isShowContent={isShowContent}
              style={style}
            >
              {children}
            </SelectListWrapper>
          </ul>
        </Portal>
      </div>
    </div>
  );
};
