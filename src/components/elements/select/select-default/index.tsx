import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import { SelectGeneral } from "../select-components";
import { TSelectDefaultProps } from "../type";

export const Select: React.FC<TSelectDefaultProps> = ({
  list,
  value,
  suffix,
  placeHolder,
  className,
  classNameDisplay,
  style = "default",
  isPortal = true,
  onChange,
}) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const listRef = useRef(null);
  const displayRef = useRef(null);

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

  const handleSetSelectedItem = (item: string) => () => {
    onChange(
      ((currentItem) => {
        if (currentItem !== item) {
          return item;
        }
        return;
      })()
    );
    setIsShowContent(false);
  };

  return (
    <SelectGeneral
      isPortal={isPortal}
      displayElement={
        <>
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
        </>
      }
      isShowContent={isShowContent}
      style={style}
      classNameDisplay={classNameDisplay}
      className={className}
      setIsShowContent={setIsShowContent}
    >
      {list.map((item: string, index: number) => (
        <li
          key={index}
          aria-hidden="true"
          onClick={handleSetSelectedItem(item)}
          className={classNames(
            "py-1 px-2 hover:bg-primary-100 cursor-pointer transition-colors duration-70",
            {
              "bg-primary-50 text-primary-800 font-medium": item === value,
            }
          )}
        >
          <h1>
            {item} {suffix}
          </h1>
        </li>
      ))}
    </SelectGeneral>
  );
};
