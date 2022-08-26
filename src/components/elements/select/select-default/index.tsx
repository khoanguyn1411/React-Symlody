import classNames from "classnames";
import React, { ReactNode, useState } from "react";

import { Portal } from "@/components";
import { useHideOnClickOutside, usePositionPortal } from "@/hooks";

import { SelectDisplayWrapper, SelectListWrapper } from "../select-components";
import { TSelectGeneralProps, TStyle } from "../type";

export type TItemListDropdown = {
  prefix?: ReactNode;
  suffix?: ReactNode;
  value: string;
};

type TProps = {
  suffix?: ReactNode;
  list: TItemListDropdown[];
  style?: TStyle;
  placeHolder?: string;
  classNameDisplay?: TSelectGeneralProps["classNameDisplay"];
  className?: TSelectGeneralProps["className"];
  isPortal?: TSelectGeneralProps["isPortal"];
  value: string;
  onChange: (value: string) => void;
};

export const Select: React.FC<TProps> = ({
  classNameDisplay,
  className,
  suffix,
  placeHolder,
  list,
  value,
  onChange,
  style = "default",
  isPortal = true,
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
    placement: "bottom-left",
  });

  const handleToggleContent = () => {
    setPositionList();
    setIsShowContent(!isShowContent);
  };

  const handleSetSelectedItem = (item: TItemListDropdown) => () => {
    onChange(
      ((currentItem) => {
        if (currentItem !== item.value) {
          return item.value;
        }
        return;
      })()
    );
    setIsShowContent(false);
  };

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
        {isPortal && (
          <Portal>
            <ul ref={listRef}>
              <SelectListWrapper
                isPortal={isPortal}
                position={position}
                isShowContent={isShowContent}
                style={style}
              >
                {list.map((item, index: number) => (
                  <li
                    key={index}
                    aria-hidden="true"
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
          </Portal>
        )}
        {!isPortal && (
          <ul ref={listRef}>
            <SelectListWrapper
              isPortal={isPortal}
              isShowContent={isShowContent}
              style={style}
            >
              {list.map((item, index: number) => (
                <li
                  key={index}
                  aria-hidden="true"
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
        )}
      </div>
    </div>
  );
};
