import classNames from "classnames";
import React, { ReactNode, useLayoutEffect, useState } from "react";

import { Portal } from "@/components";
import { useHideOnClickOutside, usePositionPortal } from "@/hooks";

import { AlignedPlacement } from "../../portal/type";
import { SelectDisplayWrapper, SelectListWrapper } from "../select-components";
import { TSelectGeneralProps, TStyle } from "../type";

export type TItemListSelect = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  key?: string;
  value: string;
};

type TProps = {
  suffix?: ReactNode;
  list: readonly TItemListSelect[];
  style?: TStyle;
  placeHolder?: string;
  classNameDisplay?: TSelectGeneralProps["classNameDisplay"];
  className?: TSelectGeneralProps["className"];
  isPortal?: TSelectGeneralProps["isPortal"];
  value: string;
  isUrlInteracting?: boolean;
  paramChangeDependency?: string;
  placement?: AlignedPlacement;
  onChange: (value: string) => void;
  onChangeSideEffect?: (item: TItemListSelect) => void;
};

export const Select: React.FC<TProps> = ({
  classNameDisplay,
  className,
  suffix,
  placeHolder,
  list,
  value,
  onChange,
  onChangeSideEffect,
  paramChangeDependency,
  style = "default",
  isUrlInteracting = false,
  isPortal = true,
  placement = "bottom-left",
}) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const { listRef, displayRef } = useHideOnClickOutside(
    isShowContent,
    setIsShowContent
  );
  const { position, setPositionList } = usePositionPortal<HTMLDivElement>({
    displayRef,
    isPortal,
    isShowing: isShowContent,
    placement: placement,
  });

  const handleToggleContent = () => {
    setPositionList();
    setIsShowContent((prev) => !prev);
  };

  const handleSetSelectedItem = (item: TItemListSelect) => () => {
    onChange(
      ((currentItem) => {
        if (currentItem !== item.value) {
          return item.value;
        }
        return;
      })()
    );
    onChangeSideEffect && onChangeSideEffect(item);
    setIsShowContent(false);
  };

  useLayoutEffect(() => {
    if (!isUrlInteracting) {
      return;
    }
    const selectedOption = list.find(
      (item) => item.key === paramChangeDependency
    );
    onChange(selectedOption ? selectedOption.value : list[0].value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramChangeDependency]);

  const ListComponent = (
    <ul ref={listRef}>
      <SelectListWrapper
        isPortal={isPortal}
        position={position}
        isShowContent={isShowContent}
        style={style}
      >
        {list.map((item, index: number) => (
          <li
            role={"menuitem"}
            onKeyDown={null}
            key={index}
            tabIndex={0}
            onClick={handleSetSelectedItem(item)}
            className={classNames(
              "py-1 px-2 hover:bg-primary-50 cursor-pointer transition-colors duration-70",
              {
                "bg-primary-50 text-primary-800 font-medium":
                  item.value === value,
              }
            )}
          >
            <h1>
              {item.prefix} {item.value} {item.suffix}
            </h1>
          </li>
        ))}
      </SelectListWrapper>
    </ul>
  );

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
          <h1 className={classNames("pr-3", { "text-gray-400": !value })}>
            {value ? value + " " + (suffix ? suffix : "") : placeHolder}
          </h1>
          <span>
            <i
              className={classNames(
                "fas fa-angle-down text-lg -mr-5 duration-300 transition-transform",
                {
                  "transform -rotate-180": isShowContent,
                  "text-grey-400": !(style === "modal"),
                }
              )}
            />
          </span>
        </SelectDisplayWrapper>
        {/* List */}
        {isPortal && <Portal>{ListComponent}</Portal>}
        {!isPortal && ListComponent}
      </div>
    </div>
  );
};
