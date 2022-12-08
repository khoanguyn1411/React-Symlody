import classNames from "classnames";
import React from "react";

import { Checkbox } from "@/components/elements/checkbox";

import { TOptionProps } from "../../type";

export const SelectMultipleOption: React.FC<
  TOptionProps & { selectedOption: TOptionProps[] }
> = ({ label, value, selectedOption }) => {
  const selectedOptionValues = selectedOption.map((option) => option.value);
  return (
    <div
      className={classNames(
        "py-1 px-2 hover:bg-primary-50 cursor-pointer flex items-center hover:bg-grey transition-colors duration-70"
      )}
    >
      <Checkbox
        checked={selectedOption && selectedOptionValues.includes(value)}
      />
      <h1>{label}</h1>
    </div>
  );
};
