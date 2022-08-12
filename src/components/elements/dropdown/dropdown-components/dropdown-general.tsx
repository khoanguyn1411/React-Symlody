import React, { ReactNode, useEffect, useRef } from "react";

import { AnimationCustom, ToggleWrapper } from "@/components";

import { AlignedPlacement, DropdownListWrapper } from "../dropdown-components";

type TProps = {
  children: ReactNode;
  display: ReactNode;
  isShowContent: boolean;
  placement?: AlignedPlacement;
  setIsShowContent: React.Dispatch<React.SetStateAction<boolean>>;
};

export const DropdownGeneral: React.FC<TProps> = ({
  children,
  display,
  isShowContent,
  placement,
  setIsShowContent,
}) => {
  const listRef = useRef(null);
  const displayRef = useRef(null);

  const handleToggleDropdown = () => {
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
        className="w-full"
      >
        {display}
      </div>
      {/* List */}
      <AnimationCustom>
        <DropdownListWrapper
          placement={placement}
          ref={listRef}
          isShowContent={isShowContent}
        >
          <ToggleWrapper isShowing={isShowContent}>{children}</ToggleWrapper>
        </DropdownListWrapper>
      </AnimationCustom>
    </div>
  );
};
