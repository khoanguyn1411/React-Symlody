import classNames from "classnames";
import React, { ReactNode, useLayoutEffect, useState } from "react";

import { Loading } from "@/components";
import { useHideOnClickOutside, usePositionPortal } from "@/hooks";

import { Portal } from "../../portal";
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
  classNameList?: string;
  className?: TSelectGeneralProps["className"];
  isPortal?: TSelectGeneralProps["isPortal"];
  value: string;
  isUrlInteracting?: boolean;
  paramChangeDependency?: string;
  placement?: AlignedPlacement;
  isLoading?: boolean;
  children?: ReactNode;
  onChange: (value: string) => void;
  onChangeSideEffect?: (item: TItemListSelect) => void;
};

export const Select: React.FC<TProps> = ({
  classNameDisplay,
  className,
  classNameList,
  suffix,
  placeHolder,
  list,
  children,
  value,
  onChange,
  onChangeSideEffect,
  paramChangeDependency,
  style = "default",
  isUrlInteracting = false,
  isPortal = true,
  isLoading = false,
  placement = "bottom-left",
}) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const { listRef, displayRef } = useHideOnClickOutside(
    isShowContent,
    setIsShowContent
  );

  const [selectedItem, setSelectedItem] = useState<TItemListSelect>(
    list.find((item) => item.value === value) ?? null
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
    setSelectedItem(item);
    onChangeSideEffect && onChangeSideEffect(item);
    setIsShowContent(false);
  };

  if (isUrlInteracting && paramChangeDependency) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
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
  }

  const ListComponent = (
    <ul ref={listRef}>
      <SelectListWrapper
        isPortal={isPortal}
        position={position}
        isShowContent={isShowContent}
        style={style}
        classNameList={classNameList}
      >
        {!isLoading && list.length === 0 && (
          <div className="px-4 py-5">No data</div>
        )}
        {isLoading && <Loading />}

        {!isLoading &&
          list.map((item, index: number) => (
            <li
              role={"menuitem"}
              onKeyDown={null}
              key={item.value + index}
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
              <h1 className="flex">
                <span className="flex items-center mr-3 w-[fit-content]">
                  {item.prefix}
                </span>
                {item.value} {item.suffix}
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
          style={children ? "none" : style}
          ref={displayRef}
          onClick={handleToggleContent}
        >
          {!children && (
            <>
              <h1
                className={classNames("pr-3 flex", {
                  "text-gray-400": !value,
                })}
              >
                <span className="flex items-center mr-3 w-[fit-content]">
                  {selectedItem?.prefix}
                </span>
                {value ? value + " " + (suffix ? suffix : "") : placeHolder}
              </h1>
              <span>
                <i
                  className={classNames(
                    "fas fa-angle-down text-gray-400 text-lg -mr-5 duration-300 transition-transform",
                    {
                      "transform -rotate-180": isShowContent,
                    }
                  )}
                />
              </span>
            </>
          )}
          {children}
        </SelectDisplayWrapper>
        {/* List */}
        {isPortal && <Portal>{ListComponent}</Portal>}
        {!isPortal && ListComponent}
      </div>
    </div>
  );
};
