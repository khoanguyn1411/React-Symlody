import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

type TProps = {
  list: string[];
  value: string;
  placeHolder?: string;
  style?: "modal" | "default";
  onChange: (param: string) => void;
};

export const Select: React.FC<TProps> = ({
  list,
  value,
  placeHolder,
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
    onChange(item);
    setIsShowContent(false);
  };
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
          <h1 className={classNames({ "text-gray-400": !value })}>
            {value ?? placeHolder}
          </h1>
          <span>
            <i
              className={classNames(
                "fas fa-angle-down -mr-5 duration-300 transition-transform text-base",
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
            "absolute z-10 w-full max-h-64 overflow-auto bg-white duration-100 drop-shadow-lg mt-2",
            {
              "opacity-100 visible": isShowContent,
              "opacity-0 invisible": !isShowContent,
            }
          )}
        >
          {list.map((item: string, index: number) => (
            <div
              key={index}
              aria-hidden="true"
              onClick={handleSetSelectedItem(item)}
              className={classNames(
                "py-1 px-2 hover:bg-primary-100 cursor-pointer min-lg:hover:bg-grey transition-all duration-70",
                {
                  "bg-primary-200": item === value,
                }
              )}
            >
              <h1>{item}</h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
