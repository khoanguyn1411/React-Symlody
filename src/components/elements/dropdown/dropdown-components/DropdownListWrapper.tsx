import classNames from "classnames";
import { useEffect, useRef } from "react";

import { useHideOnClickOutside, usePositionPortal } from "@/hooks";
import { GlobalTypes } from "@/utils";
import { FCPropsWithChildren, ReactStateAction } from "@/utils/types";

import { AnimationCustom } from "../../animation-custom";
import { AlignedPlacement } from "../../portal/type";

type TProps = {
  isOverflow: boolean;
  isShowContent: boolean;
  widthContainer?: string;
  placement: AlignedPlacement;
  displayRef: React.MutableRefObject<HTMLDivElement>;
  setIsContent: ReactStateAction<boolean>;
};

export const DropdownListWrapper: GlobalTypes.FCPropsWithChildren<TProps> = ({
  children,
  ...props
}) => {
  return (
    <AnimationCustom
      className={classNames("fixed z-30")}
      isShowing={props.isShowContent}
    >
      <DropdownListContent {...props}> {children}</DropdownListContent>
    </AnimationCustom>
  );
};

const DropdownListContent: FCPropsWithChildren<TProps> = ({
  isShowContent,
  children,
  widthContainer = "320px",
  isOverflow,
  setIsContent,
  displayRef,
  placement,
}) => {
  const listRef = useRef<HTMLUListElement>(null);

  useHideOnClickOutside(isShowContent, setIsContent, listRef, displayRef);

  const { setPositionList, position } = usePositionPortal<HTMLDivElement>({
    displayRef,
    spaceAdditionalTop: 10,
    isPortal: true,
    placement,
    toggleRef: listRef,
    isShowing: isShowContent,
  });

  useEffect(() => {
    if (isShowContent) {
      setPositionList();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isShowContent]);

  return (
    <ul
      ref={listRef}
      style={{ ...position, width: widthContainer }}
      className={classNames(
        "w-full",
        "bg-white border border-gray-200",
        "drop-shadow-lg",
        "rounded-md",
        "mt-2 py-1.5",
        "fixed z-10",
        {
          "overflow-auto": isOverflow,
        }
      )}
    >
      {children}
    </ul>
  );
};
