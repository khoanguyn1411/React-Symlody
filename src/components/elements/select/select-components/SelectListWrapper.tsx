import classNames from "classnames";
import React, { useEffect, useRef } from "react";

import { useHideOnClickOutside, usePositionPortal } from "@/hooks";
import { GlobalTypes } from "@/utils";
import { FCPropsWithChildren, ReactStateAction } from "@/utils/types";

import { AnimationCustom } from "../../animation-custom";
import { AlignedPlacement } from "../../portal/type";

type TProps = {
  displayRef: React.MutableRefObject<HTMLDivElement>;
  isPortal: boolean;
  placement: AlignedPlacement;
  isShowing: boolean;
  setIsShowing: ReactStateAction<boolean>;
  maxHeight: number;
  classNameList: string;
  isNoPaddingY: boolean;
};

export const SelectListWrapper: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  ...props
}) => {
  return (
    <AnimationCustom
      isShowing={props.isShowing}
      className={classNames(props.isPortal ? "!z-30 fixed" : "z-10")}
    >
      <SelectListContent {...props}>{children}</SelectListContent>
    </AnimationCustom>
  );
};

const SelectListContent: FCPropsWithChildren<TProps> = ({
  children,
  displayRef,
  isPortal,
  isShowing,
  placement,
  maxHeight = 200,
  isNoPaddingY,
  classNameList,
  setIsShowing,
}) => {
  const listRef = useRef<HTMLUListElement>(null);
  useHideOnClickOutside(isShowing, setIsShowing, listRef, displayRef);

  const { setPositionList, position } = usePositionPortal({
    displayRef,
    isPortal,
    isShowing: isShowing,
    placement: placement,
    spaceAdditionalTop: 10,
    toggleRef: listRef,
  });

  useEffect(() => {
    if (isShowing) {
      setPositionList();
    }
  }, [isShowing, setPositionList]);

  return (
    <ul
      ref={listRef}
      className={classNames(
        "w-full min-w-[fit-content] bg-white border border-gray-200 rounded-md overflow-auto shadow-md mt-2",
        {
          fixed: isPortal,
          "absolute top-11 left-0": !isPortal,
          "py-1.5": !isNoPaddingY,
        },
        classNameList
      )}
      style={{ ...position, maxHeight: maxHeight }}
    >
      {children}
    </ul>
  );
};
