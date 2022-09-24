import classNames from "classnames";
import React, { memo, useRef, useState } from "react";

import { Checkbox, Portal } from "@/components";
import { useHideOnClickOutside, usePositionPortal } from "@/hooks";

import { SelectDisplayWrapper } from "../select-components";
import { SelectListWrapper } from "../select-components/select-list-wrapper";
import { TSelectMultipleProps } from "../type";

const _SelectMultiple: React.FC<TSelectMultipleProps> = ({
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
        {list.map((item: string, index: number) => (
          <li
            key={item + index}
            aria-hidden="true"
            onClick={handleSetItem(item)}
            className={classNames(
              "py-1 px-2 hover:bg-primary-50 cursor-pointer flex items-center hover:bg-grey transition-colors duration-70"
            )}
          >
            <Checkbox checked={value && [...value].includes(item)} />
            <h1>{item}</h1>
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
              {value.map((item: string) => (
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
              ))}
            </div>
          )}

          <span ref={iconRef}>
            <i
              className={classNames(
                "fas fa-angle-down duration-300 -mr-5 transition-transform text-base",
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

export const SelectMultiple = memo(_SelectMultiple);