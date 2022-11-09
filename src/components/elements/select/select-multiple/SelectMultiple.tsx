import classNames from "classnames";
import React, { useRef, useState } from "react";

import { useHideOnClickOutside, usePositionPortal } from "@/hooks";

import { Checkbox } from "../../checkbox";
import { Portal } from "../../portal";
import { SelectDisplayWrapper } from "../select-components";
import { SelectListWrapper } from "../select-components/SelectListWrapper";
import { TSelectMultipleProps } from "../type";

export const SelectMultiple: React.FC<TSelectMultipleProps> = ({
  list,
  value = [],
  placeHolder,
  style = "default",
  isPortal = true,
  onChange,
}) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);

  const wrapperSelectRef = useRef(null);
  const iconRef = useRef(null);

  const { listRef, displayRef } = useHideOnClickOutside(
    isShowContent,
    setIsShowContent
  );
  const { setPositionList, position } = usePositionPortal({
    displayRef,
    isPortal,
    isShowing: isShowContent,
    placement: "bottom-left",
  });
  const handleSetItem = (checked: string) => () => {
    if (!value) {
      return onChange([checked]);
    }
    if ([...value].includes(checked)) {
      return onChange([...value].filter((item) => item !== checked));
    }
    return onChange([...value, checked]);
  };

  const handleToggleContent = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const elementWrapperSelect = wrapperSelectRef?.current;
    const elementDisplay = displayRef?.current;
    const elementIcon = iconRef?.current;
    if (
      elementWrapperSelect !== e.target &&
      elementDisplay != e.target &&
      !elementIcon.contains(e.target)
    ) {
      return;
    }
    setPositionList();
    setIsShowContent(!isShowContent);
  };
  const ListComponent: JSX.Element = (
    <ul ref={listRef}>
      <SelectListWrapper
        isPortal={isPortal}
        position={position}
        style={style}
        isShowContent={isShowContent}
      >
        {list.map((item, index: number) => (
          <li
            key={item.value + index}
            aria-hidden="true"
            onClick={handleSetItem(item.value)}
            className={classNames(
              "py-1 px-2 hover:bg-primary-50 cursor-pointer flex items-center hover:bg-grey transition-colors duration-70"
            )}
          >
            <Checkbox checked={value && [...value].includes(item.value)} />
            <h1>{item.label}</h1>
          </li>
        ))}
      </SelectListWrapper>
    </ul>
  );

  return (
    <div>
      <div className="relative cursor-pointer">
        {/* Display */}
        <SelectDisplayWrapper
          ref={displayRef}
          onClick={handleToggleContent}
          aria-hidden="true"
          style={style}
        >
          {!value || value.length === 0 ? (
            <h1 className="text-gray-400">{placeHolder}</h1>
          ) : (
            <div className="flex flex-wrap gap-3" ref={wrapperSelectRef}>
              {/* {value.map((item: string) => (
                <div
                  className="relative px-2 py-1 pr-5 text-xs bg-gray-200 min-w-max rounded-md"
                  key={item}
                >
                  {item}
                  <span
                    className="absolute top-0 bottom-0 right-0 flex items-center h-full px-1 ml-3 hover:bg-gray-300 rounded-r-md transition-all"
                    aria-hidden={true}
                    onClick={handleSetItem(item)}
                  >
                    <i className="fas fa-times"></i>
                  </span>
                </div>
              ))} */}

              {value.map((v, index) => {
                const data = list.find((i) => i.value === v);

                return (
                  <div
                    className={classNames(
                      "relative flex items-center px-2 py-1 text-sm shadow-md  transition-all duration-200 space-x-2 min-w-max rounded-md",
                      style === "modal"
                        ? "bg-white hover:bg-gray-50"
                        : "bg-gray-100 hover:bg-gray-200"
                    )}
                    key={v + index}
                  >
                    <span>{data?.label}</span>
                    <span
                      className="flex items-center h-full text-gray-400"
                      aria-hidden={true}
                      onClick={handleSetItem(v)}
                    >
                      <i className="fas fa-times" />
                    </span>
                  </div>
                );
              })}
            </div>
          )}

          <span ref={iconRef}>
            <i
              className={classNames(
                "fas fa-caret-down duration-200 transition-transform text-gray-400",
                {
                  "transform -rotate-180": isShowContent,
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
