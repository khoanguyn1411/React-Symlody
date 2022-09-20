import classNames from "classnames";
import { memo } from "react";

import { STYLE_INPUT_DEFAULT, TInputDefaultProps } from "../type";

const _Input: React.FC<TInputDefaultProps> = ({
  type,
  value = "",
  placeholder,
  style = "default",
  className,
  disable = false,
  onChange,
  onInputSideEffect,
}) => {
  const handleChangeEvent = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onInputSideEffect) {
      const returnValue = onInputSideEffect(event);
      const newValue = returnValue.newValue;
      return onChange(newValue);
    }
    return !event.target.value.startsWith(" ") && onChange(event.target.value);
  };

  return (
    <input
      type={type}
      disabled={disable}
      value={value}
      onChange={handleChangeEvent}
      placeholder={placeholder}
      className={classNames(
        "w-full p-2 border-gray-200 text-black focus:outline-none rounded-md",
        className,
        STYLE_INPUT_DEFAULT[style]
      )}
    />
  );
};

export const Input = memo(_Input);
