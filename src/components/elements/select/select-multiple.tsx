import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import { Checkbox } from "../checkbox";

type TProps = {
  list: string[];
  value: string[];
  placeHolder?: string;
  style?: "modal" | "default";
  onChange: (value: string[]) => void;
};

export const SelectMultiple: React.FC<TProps> = ({
  list,
  value,
  placeHolder,
  style = "default",
  onChange,
}) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
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
    setIsShowContent(!isShowContent);
  };
  return (
    <div>
      <div className="relative cursor-pointer">
        {/* Display */}
        <div
          ref={displayRef}
          onClick={(e) => handleToggleContent(e)}
          aria-hidden="true"
          className={classNames(
            "flex justify-between w-full p-2 mt-3 pr-5 rounded-md text-black",
            {
              "bg-gray-100": style === "modal",
              "bg-white border border-primary-800": style === "default",
            }
          )}
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
                    className="absolute top-0 bottom-0 right-0 flex items-center h-full px-1 ml-3 hover:bg-gray-300 rounded-r-md transition-all duration-150"
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
        </div>
        {/* List */}
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          className={classNames(
            "absolute z-20 w-full py-1 rounded-md max-h-64 overflow-auto duration-100 shadow-md mt-2",
            {
              "opacity-100 visible": isShowContent,
              "opacity-0 invisible": !isShowContent,
              "bg-white": style === "default",
              "bg-grey-100 ": style === "modal",
            }
          )}
        >
          {list.map((item: string, index: number) => (
            <li
              key={index}
              aria-hidden="true"
              onClick={handleSetItem(item)}
              className={classNames(
                "py-1 px-2 hover:bg-primary-100 cursor-pointer flex items-center hover:bg-grey transition-all duration-70"
              )}
            >
              <Checkbox checked={value && [...value].includes(item)} />
              <h1>{item}</h1>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
