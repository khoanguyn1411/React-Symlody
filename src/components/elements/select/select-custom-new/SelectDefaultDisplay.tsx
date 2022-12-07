import classNames from "classnames";
import React from "react";

import { TOptionProps } from "../type";

type Props = {
  selectedControlledValue: string;
  selectedUncontrolledOption: TOptionProps;
  isShowContent: boolean;
  placeholder: string;
};

export const SelectDefaultDisplay: React.FC<Props> = ({
  selectedUncontrolledOption,
  selectedControlledValue,
  isShowContent,
  placeholder,
}) => {
  const getDisplayUI = () => {
    if (selectedControlledValue) {
      return selectedControlledValue;
    }
    if (selectedUncontrolledOption) {
      return (
        selectedUncontrolledOption.label +
        " " +
        (selectedUncontrolledOption.suffix
          ? selectedUncontrolledOption.suffix
          : "")
      );
    }
    return placeholder;
  };
  return (
    <>
      <h1
        className={classNames("pr-3 flex gap-3", {
          "text-gray-400":
            !selectedUncontrolledOption && !selectedControlledValue,
        })}
      >
        {selectedUncontrolledOption?.prefix && (
          <span className="flex items-center w-[fit-content]">
            {selectedUncontrolledOption.prefix}
          </span>
        )}
        {getDisplayUI()}
      </h1>
      <span>
        <i
          className={classNames(
            "fas fa-caret-down text-gray-400 duration-300 transition-transform",
            {
              "transform -rotate-180": isShowContent,
            }
          )}
        />
      </span>
    </>
  );
};
