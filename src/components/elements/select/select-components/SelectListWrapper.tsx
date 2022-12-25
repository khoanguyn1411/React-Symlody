import classNames from "classnames";
import React, { useEffect, useRef } from "react";

import { useHideOnClickOutside, usePositionPortal } from "@/hooks";
import { AppReact } from "@/utils/types";

import { AnimationCustom } from "../../animation-custom";
import { AlignedPlacement } from "../../portal/type";

type TProps = {
  displayRef: React.MutableRefObject<HTMLDivElement>;
  isPortal: boolean;
  placement: AlignedPlacement;
  isShowing: boolean;
  setIsShowing: AppReact.State.Dispatch<boolean>;
  maxHeight: number;
  classNameList: string;
  isNoPaddingY: boolean;
};

export const SelectListWrapper: AppReact.FC.PropsWithChildren<TProps> = ({
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

const SelectListContent: AppReact.FC.PropsWithChildren<TProps> = ({
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
    const selectedOption = document.getElementsByClassName(
      "selected-select-option"
    );
    if (selectedOption == null || selectedOption[0] == null) {
      return;
    }
    selectedOption[0].scrollIntoView({ block: "center" });
  }, []);

  useEffect(() => {
    if (isShowing) {
      setPositionList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowing]);

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
