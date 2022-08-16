import classNames from "classnames";
import React, { ReactNode } from "react";

import { useRadioGroupContext } from "../context";

type TProps = {
  children?: ReactNode;
  isChecked?: boolean;
  value: string;
};

export const Radio: React.FC<TProps> = ({
  isChecked = undefined,
  children,
  value,
}) => {
  const { checked, setActiveValue, setChecked } = useRadioGroupContext();
  const handleChangeChecked = () => {
    setChecked(value);
    setActiveValue(value);
  };
  return (
    <div className="w-full">
      <label
        className={classNames(
          "flex items-center",
          !children && "w-[fit-content]"
        )}
      >
        <div className="relative flex items-center p-2 -ml-2 overflow-hidden rounded-full cursor-pointer">
          <input
            type="radio"
            name="has"
            onChange={handleChangeChecked}
            checked={isChecked ?? checked === value}
            className="relative w-5 h-5 border border-gray-300 rounded-full appearance-none cursor-pointer text-primary-800 peer transition-all before:content[''] before:block before:bg-blue-grey-500 before:w-12 before:h-12 before:rounded-full before:absolute before:top-2/4 before:left-2/4 before:-translate-y-2/4 before:-translate-x-2/4 before:opacity-0 hover:before:opacity-10 before:transition-opacity checked:border-primary-800 checked:before:bg-primary-800"
          />
          <div className="absolute opacity-0 pointer-events-none text-primary-800 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100 transition-opacity">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5"
              viewBox="0 0 16 16"
              fill="currentColor"
            >
              <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
          </div>
        </div>
        <div
          className={classNames(
            "text-black cursor-pointer select-none",
            children && "flex-1"
          )}
        >
          {children || value}
        </div>
      </label>
    </div>
  );
};
