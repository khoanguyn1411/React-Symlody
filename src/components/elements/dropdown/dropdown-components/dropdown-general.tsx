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
  placement,
  isOverflow = true,
  widthContainer = "320px",
  setIsShowContent,
}) => {
  const { listRef, displayRef } = useHideOnClickOutside(
    isShowContent,
    setIsShowContent
  );
  const { coords, setPositionList } = usePositionPortal<HTMLDivElement>(
    displayRef,
    true
  );

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
