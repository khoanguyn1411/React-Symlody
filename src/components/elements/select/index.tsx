import classNames from "classnames";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";

type TProps = {
  list: number[] | string[];
  value: number | string;
  onChange: React.Dispatch<React.SetStateAction<string | number>>;
  placeHolder?: string;
};

export const Select: FunctionComponent<TProps> = ({
  list,
  value,
  onChange,
  placeHolder,
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
    window.addEventListener("click", handleCloseListDiv);
    return () => {
      window.removeEventListener("click", handleCloseListDiv);
    };
  }, [isShowContent]);

  const handleSetSelectedItem = (item: number | string) => {
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
          className="flex justify-between w-full p-2 mt-2 bg-white border border-primary-800 rounded-md"
        >
          <h1 className={classNames({ "text-gray-400": !value })}>
            {value ?? placeHolder}
          </h1>
          <span>
            <i
              className={classNames(
                "fas fa-angle-down duration-300 transition-transform text-base",
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
            "absolute z-10 w-full overflow-auto bg-white duration-75 shadow-md mt-2",
            { "scale-100": isShowContent, "scale-0": !isShowContent }
          )}
        >
          {list.map((item: number | string, index: number) => (
            <div
              key={index}
              aria-hidden="true"
              onClick={() => handleSetSelectedItem(item)}
              className={classNames(
                "py-1 px-2 hover:bg-primary-100 cursor-pointer min-lg:hover:bg-grey transition-all",
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
