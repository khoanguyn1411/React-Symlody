import classNames from "classnames";

import { STYLE_INPUT_DEFAULT, TInputDefaultProps } from "../type";

export const Input: React.FC<TInputDefaultProps> = ({
  type,
  value = "",
  placeholder,
  style = "default",
  className,
  disable = false,
  otherProps,
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
      value={value ?? ""}
      onChange={handleChangeEvent}
      placeholder={placeholder}
      className={classNames(
        style !== "none" && "w-full p-2 rounded-md",
        "focus:outline-none appearance-none",
        className,
        STYLE_INPUT_DEFAULT[style],
        disable && "cursor-not-allowed"
      )}
      {...otherProps}
    />
  );
};
