import React from "react";

import { TInputUnderLine } from "../type";

export const InputUnderLine: React.FC<TInputUnderLine> = ({
  value = "",
  label = "Khác",
  disable = false,
  handleSideEffect,
  onChange,
}) => {
  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (handleSideEffect) {
      const returnValue = handleSideEffect(event);
      const newValue = returnValue.newValue;
      return onChange(newValue);
    }
    return !event.target.value.startsWith(" ") && onChange(event.target.value);
  };
  return (
    <div className="w-full">
      <label className="flex items-center">
        <span className="min-w-max">{label}:</span>
        <div className="relative w-full ml-2 min-w-[200px]">
          <input
            value={value}
            onChange={handleChangeEvent}
            disabled={disable}
            className="w-full h-full font-sans text-base font-normal text-black bg-transparent border-b border-gray-300 peer outline-0 focus:outlined-0  disabled:text-gray-400 transition-all placeholder-shown:border-gray-300 focus:border-primary-800"
          />
          <span className="absolute left-0 flex w-full h-full text-sm font-normal leading-tight text-gray-300 pointer-events-none select-none peer-placeholder-shown:text-gray-300 peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-gray-300 transition-all -top-[10px] peer-focus:text-sm after:content[' '] after:block after:w-full after:absolute after:-bottom-2.5 after:border-b-2 after:scale-x-0 peer-focus:after:scale-x-100 after:transition-transform after:duration-300 peer-placeholder-shown:leading-tight peer-focus:text-primary-800 after:border-primary-800 peer-focus:after:border-primary-800" />
        </div>
      </label>
    </div>
  );
};
