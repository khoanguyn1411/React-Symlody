import classNames from "classnames";
import React, { useEffect, useRef } from "react";

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
  useEffect(() => {
    if (!textAreaRef?.current) {
      return;
    }
    textAreaRef.current.style.height = initialHeight;
    textAreaRef.current.style.height = textAreaRef.current.scrollHeight + "px";
  }, [initialHeight, value]);

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
      ref={textAreaRef}
      value={value}
      placeholder={placeholder}
      onChange={handleChangeEvent}
      disabled={disable}
      className={classNames(
        "w-full p-2 border-gray-200 max-h-72 resize-none text-black outline-none rounded-md",
        className,
        STYLE_INPUT_TEXT_AREA[style]
      )}
      {...otherProps}
    />
  );
};
