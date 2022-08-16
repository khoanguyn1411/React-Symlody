import classNames from "classnames";
import React from "react";

type TProps = {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  style?: "modal" | "default";
  handleSideEffect?: (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    onChange: (value: string) => void
  ) => {
    isDisableOnChange: boolean;
  };
};

export const TextArea: React.FC<TProps> = ({
  value = "",
  onChange,
  placeholder,
  handleSideEffect,
  style = "default",
}) => {
  const handleChangeEvent = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (handleSideEffect) {
      if (handleSideEffect(event, onChange).isDisableOnChange) {
        return;
      }
    }
    return onChange(event.target.value);
  };
  return (
    <textarea
      value={value}
      onChange={handleChangeEvent}
      placeholder={placeholder}
      className={classNames(
        "w-full p-2 border-gray-200 h-28 resize-none text-black outline-none rounded-md",
        {
          "bg-gray-100": style === "modal",
          "border-[1.5px]": style === "default",
        }
      )}
    />
  );
};
