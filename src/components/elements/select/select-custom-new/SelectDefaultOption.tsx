import classNames from "classnames";
import React from "react";

import { TOptionProps } from "../type";

export const SelectDefaultOption: React.FC<
  TOptionProps & {
    selectedUncontrolledOption: TOptionProps;
    selectedControlledValue: string;
  }
> = ({
  suffix,
  prefix,
  label,
  value,
  selectedControlledValue,
  selectedUncontrolledOption,
}) => {
  const hasNoneSelectedEntity =
    selectedControlledValue == null && selectedUncontrolledOption == null;
  const getValue = () => {
    if (hasNoneSelectedEntity) {
      return null;
    }
    if (selectedControlledValue != null) {
      return selectedControlledValue;
    }
    return selectedUncontrolledOption.value;
  };
  return (
    <div
      className={classNames(
        "py-1 px-2 hover:bg-primary-50 cursor-pointer transition-colors duration-70",
        {
          "bg-primary-50 text-primary-800 font-medium": value === getValue(),
        }
      )}
    >
      <h1 className="flex gap-3">
        {prefix && (
          <span className="flex items-center w-[fit-content]">{prefix}</span>
        )}
        {label} {suffix}
      </h1>
    </div>
  );
};
