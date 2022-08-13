import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import { AnimationCustom } from "../animation-custom";

type TProps = {
  list: readonly string[];
  value: string;
  placeHolder?: string;
  className?: string;
  classNameDisplay?: string;
  style?: "modal" | "default";
  suffix?: string;
  onChange: (param: string) => void;
};

export const Select: React.FC<TProps> = ({
  list,
  value,
  suffix,
  placeHolder,
  className,
  classNameDisplay,
  style = "default",
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
  const handleToggleContent = () => {
    setIsShowContent(!isShowContent);
  };

  return (
    <div className={className}>
      <div className="relative cursor-pointer">
        {/* Display */}
        <div
          ref={displayRef}
          onClick={handleToggleContent}
          aria-hidden="true"
          className={classNames(
            "flex justify-between w-full items-center p-2 pr-5 rounded-lg text-black",
            classNameDisplay,
            {
              "bg-gray-100 rounded-md": style === "modal",
              "bg-white border border-gray-200": style === "default",
            }
          )}
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
        </div>
        {/* List */}
        <AnimationCustom
          isShowing={isShowContent}
          ref={listRef}
          className={classNames(
            "absolute z-10 w-full rounded-sm max-h-64 overflow-auto drop-shadow-lg mt-2",
            {
              "bg-gray-100": style === "modal",
              "bg-white": style === "default",
            }
          )}
        >
          <ul>
            {list.map((item: string, index: number) => (
              <li
                key={index}
                aria-hidden="true"
                onClick={handleSetSelectedItem(item)}
                className={classNames(
                  "py-1 px-2 hover:bg-primary-100 cursor-pointer transition-all duration-70",
                  {
                    "bg-primary-50 text-primary-800 font-medium":
                      item === value,
                  }
                )}
              >
                <h1>
                  {item} {suffix}
                </h1>
              </li>
            ))}
          </ul>
        </AnimationCustom>
      </div>
    </div>
  );
};
