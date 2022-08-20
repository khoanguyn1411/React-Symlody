import React, { ReactNode } from "react";

import { Portal } from "@/components";
import { useHideOnClickOutside, usePositionPortal } from "@/hooks";

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
  placement = "bottom-left",
  isOverflow = true,
  widthContainer = "320px",
  setIsShowContent,
}) => {
  const { listRef, displayRef } = useHideOnClickOutside(
    isShowContent,
    setIsShowContent
  );
  const { setPositionList, getPosition } = usePositionPortal<HTMLDivElement>({
    displayRef,
    isPortal: true,
    placement,
  });

  const handleToggleDropdown = () => {
    setPositionList();
    setIsShowContent(!isShowContent);
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
        {display}
      </div>
      {/* List */}
      <Portal>
        <ul ref={listRef}>
          <DropdownListWrapper
            position={getPosition()}
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
