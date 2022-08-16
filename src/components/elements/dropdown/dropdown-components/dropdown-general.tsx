import React, { ReactNode, useEffect, useRef } from "react";

import { Portal } from "@/components";
import { usePositionPortal } from "@/hooks";

import { AlignedPlacement } from "../../portal/type";
import { DropdownListWrapper } from "../dropdown-components";

type TProps = {
  children: ReactNode;
  display: ReactNode;
  isShowContent: boolean;
  placement?: AlignedPlacement;
  widthContainer?: string;
  isOverflow?: boolean;
  setIsShowContent: (isShowContent: boolean) => void;
};

export const DropdownGeneral: React.FC<TProps> = ({
  children,
  display,
  isShowContent,
  placement,
  isOverflow = true,
  widthContainer = "320px",
  setIsShowContent,
}) => {
  const listRef = useRef(null);
  const displayRef = useRef(null);

  const { coords, setPositionList } = usePositionPortal<HTMLDivElement>(
    displayRef,
    true
  );

  const handleToggleDropdown = () => {
    setPositionList();
    setIsShowContent(!isShowContent);
  };

  useEffect(() => {
    const elementList = listRef?.current;
    const elementDisplay = displayRef?.current;
    if (!elementList || !elementDisplay) return;
    const handleCloseListDiv = (event: Event) => {
      if (
        !elementList.contains(event.target) &&
        !elementDisplay.contains(event.target)
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

  return (
    <div className="relative w-full">
      {/* Display */}
      <div
        aria-hidden
        ref={displayRef}
        onClick={handleToggleDropdown}
        className="w-full cursor-pointer"
      >
        {display}
      </div>
      {/* List */}
      <Portal>
        <ul ref={listRef}>
          <DropdownListWrapper
            placement={placement}
            coords={coords}
            isShowContent={isShowContent}
            widthContainer={widthContainer}
            isOverflow={isOverflow}
          >
            {children}
          </DropdownListWrapper>
        </ul>
      </Portal>
    </div>
  );
};
