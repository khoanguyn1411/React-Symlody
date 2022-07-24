import styled from "@emotion/styled";
import { Checkbox } from "@material-tailwind/react";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

type TProps = {
  list: string[] | number[];
  value: string[] | number[];
  placeHolder?: string;
  style?: "modal" | "default";
  onChange: React.Dispatch<React.SetStateAction<string[] | number[]>>;
};

export const MultipleSelect: React.FC<TProps> = ({
  list,
  value,
  placeHolder,
  style = "default",
  onChange,
}) => {
  const [isShowContent, setIsShowContent] = useState<boolean>(false);
  const listRef = useRef(null);
  const displayRef = useRef(null);

  const WrapperModule = styled.div`
    input,
    input:checked {
      border-radius: 4px;
    }
    input:checked {
      background-color: #007ea4;
    }
  `;

  const handleSetItem = (checked: string | number) => () => {
    onChange((prev: any) => {
      // if (value != null && [...value].includes(checked)) {
      //   const newValue = [...value].filter((item) => item !== checked);
      //   if (newValue.length === 0) {
      //     return undefined;
      //   }
      //   return newValue;
      // }
      // if (value == null) {
      //   return [checked];
      // } else {
      //   return [...prev, checked];
      // }
      if (prev == null || value == null) {
        return [checked];
      }
      if ([...value].includes(checked)) {
        return [...value].filter((item) => item !== checked);
      }
      return [...prev, checked];
    });
  };
  useEffect(() => {
    const elementList = listRef?.current;
    const elementDisplay = displayRef?.current;
    if (!elementList || !elementDisplay) return;
    const handleCloseListDiv = (event: Event) => {
      if (!elementList.contains(event.target)) {
        setIsShowContent(false);
      }
    };
    window.addEventListener("click", handleCloseListDiv, true);
    return () => {
      window.removeEventListener("click", handleCloseListDiv, true);
    };
  }, [isShowContent]);

  const handleToggleContent = () => {
    setIsShowContent(!isShowContent);
  };

  return (
    <div>
      <div className="relative cursor-pointer">
        {/* Display */}
        <div
          ref={displayRef}
          onClick={handleToggleContent}
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
            <div className="flex flex-wrap gap-3">
              {value.map((item: string | number, index: number) => (
                <div
                  className="px-2 py-1 text-xs bg-gray-200 min-w-max rounded-md"
                  key={index}
                >
                  {item}
                  <span
                    className="ml-3"
                    aria-hidden={true}
                    onClick={handleSetItem(item)}
                  >
                    <i className="fas fa-times"></i>
                  </span>
                </div>
              ))}
            </div>
          )}

          <span>
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
        <div
          ref={listRef}
          className={classNames(
            "absolute z-10 w-full overflow-auto bg-white duration-100 drop-shadow-lg mt-2",
            {
              "opacity-100 visible": isShowContent,
              "opacity-0 invisible": !isShowContent,
            }
          )}
        >
          {list.map((item: string | number, index: number) => (
            <div
              key={index}
              aria-hidden="true"
              onClick={handleSetItem(item)}
              className={classNames(
                "py-1 px-2 hover:bg-primary-100 cursor-pointer flex items-center hover:bg-grey transition-all duration-70"
              )}
            >
              <WrapperModule>
                <Checkbox
                  readOnly
                  checked={value && [...value].includes(item)}
                />
              </WrapperModule>
              <h1>{item}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
