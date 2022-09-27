import classNames from "classnames";
import React from "react";

import { STYLE_INPUT_TEXT_AREA, TInputTextAreaProps } from "../type";

export const TextArea: React.FC<TInputTextAreaProps> = ({
  value = "",
  placeholder,
  style = "default",
  disable = false,
  otherProps,
  onChange,
  onInputSideEffect,
}) => {
  const handleChangeEvent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (onInputSideEffect) {
      const returnValue = onInputSideEffect(event);
      const newValue = returnValue.newValue;
      return onChange(newValue);
    }
    return !event.target.value.startsWith(" ") && onChange(event.target.value);
  };

  return (
    <textarea
      value={value}
      placeholder={placeholder}
      onChange={handleChangeEvent}
      disabled={disable}
      className={classNames(
        "w-full p-2 border-gray-200 h-28 resize-none text-black outline-none rounded-md",
        STYLE_INPUT_TEXT_AREA[style]
      )}
      {...otherProps}
    />
  );
};
