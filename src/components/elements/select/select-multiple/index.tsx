import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import { Checkbox, Portal, TPosition } from "@/components";

import { SelectDisplayWrapper } from "../select-components";
import { SelectListWrapper } from "../select-components/select-list-wrapper";

type TProps = {
  list: string[];
  value: readonly string[];
  placeHolder?: string;
  style?: "modal" | "default";
  onChange: (value: readonly string[]) => void;
};

export const SelectMultiple: React.FC<TProps> = ({
  list,
  value,
  placeHolder,
  style = "default",
  onChange,
}) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const [coords, setCoords] = useState<TPosition>({ left: 0, top: 0 });

  const listRef = useRef(null);
  const displayRef = useRef(null);
  const wrapperSelectRef = useRef(null);
  const iconRef = useRef(null);

  const handleSetItem = (checked: string) => () => {
    if (!value) onChange([checked]);
    if ([...value].includes(checked)) {
      return onChange([...value].filter((item) => item !== checked));
    }
    return onChange([...value, checked]);
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
  }, [isShowContent]);

  const setPositionList = () => {
    const rect = displayRef.current?.getBoundingClientRect();
    let leftSide = rect.left;
    leftSide = Math.max(10, leftSide);
    leftSide = Math.min(leftSide, document.body.clientWidth - rect.width - 10);
    setCoords({
      left: leftSide,
      right: rect.right - rect.left,
      top: rect.bottom,
    });
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

  useEffect(() => {
    window.addEventListener("scroll", setPositionList, true);
    window.addEventListener("resize", setPositionList, true);
    return () => {
      window.removeEventListener("scroll", setPositionList, true);
      window.removeEventListener("resize", setPositionList, true);
    };
  }, []);

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
              {value.map((item: string, index: number) => (
                <div
                  className="relative px-2 py-1 pr-5 text-xs bg-gray-200 min-w-max rounded-md"
                  key={index}
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
        <Portal>
          <ul ref={listRef}>
            <SelectListWrapper
              coords={coords}
              style={style}
              isShowContent={isShowContent}
            >
              {list.map((item: string, index: number) => (
                <li
                  key={index}
                  aria-hidden="true"
                  onClick={handleSetItem(item)}
                  className={classNames(
                    "py-1 px-2 hover:bg-primary-100 cursor-pointer flex items-center hover:bg-grey transition-colors duration-70"
                  )}
                >
                  <Checkbox checked={value && [...value].includes(item)} />
                  <h1>{item}</h1>
                </li>
              ))}
            </SelectListWrapper>
          </ul>
        </Portal>
      </div>
    </div>
  );
};
