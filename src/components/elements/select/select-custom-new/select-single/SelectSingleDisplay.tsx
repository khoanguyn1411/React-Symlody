import classNames from "classnames";
import React from "react";

import { TOptionProps } from "../../type";

type Props = {
  selectedOption: TOptionProps;
  isShowContent: boolean;
  placeholder: string;
};

export const SelectDefaultDisplay: React.FC<Props> = ({
  selectedOption,
  isShowContent,
  placeholder,
}) => {
  const getDisplayUI = () => {
    if (selectedOption) {
      return (
        selectedOption.label +
        " " +
        (selectedOption.suffix ? selectedOption.suffix : "")
      );
    }
    return placeholder;
  };
  return (
    <>
      <h1
        className={classNames("pr-3 flex gap-3", {
          "text-gray-400": !selectedOption,
        })}
      >
        {selectedOption?.prefix && (
          <span className="flex items-center w-[fit-content]">
            {selectedOption.prefix}
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
