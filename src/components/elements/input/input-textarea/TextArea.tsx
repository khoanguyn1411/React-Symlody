import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";

import { STYLE_INPUT_TEXT_AREA, TInputTextAreaProps } from "../type";

export const TextArea: React.FC<TInputTextAreaProps> = ({
  value = "",
  placeholder,
  style = "default",
  disable = false,
  otherProps,
  className,
  height: initialHeight,
  onChange,
  onInputSideEffect,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>();

  const [height, setHeight] = useState<string>(initialHeight);
  useEffect(() => {
    if (!textAreaRef?.current) {
      return;
    }
    setHeight(textAreaRef.current.scrollHeight + "px");
  }, [initialHeight, value]);

  const handleChangeEvent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    if (onInputSideEffect) {
      const returnValue = onInputSideEffect(value);
      const newValue = returnValue.newValue;
      return onChange(newValue);
    }
    return !value.startsWith(" ") && onChange(value);
  };

  console.log(height);
  return (
    <textarea
      ref={textAreaRef}
      value={value}
      style={{ height: height }}
      placeholder={placeholder}
      onChange={handleChangeEvent}
      disabled={disable}
      className={classNames(
        "w-full p-2 focus:ring-primary-800 focus:ring-1 border-gray-200 max-h-72 resize-none text-black outline-none rounded-md",
        className,
        STYLE_INPUT_TEXT_AREA[style]
      )}
      {...otherProps}
    />
  );
};
