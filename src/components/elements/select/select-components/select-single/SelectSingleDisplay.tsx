import classNames from "classnames";
import React, { ReactNode } from "react";

import { Primitive } from "@/utils/types";

import { TOptionProps } from "../../type";

type Props<T, E extends Primitive> = {
  selectedOption: TOptionProps<T, E>;
  isShowContent: boolean;
  placeholder: ReactNode;
};

export function SelectDefaultDisplay<T, E extends Primitive>({
  selectedOption,
  isShowContent,
  placeholder,
}: Props<T, E>): JSX.Element {
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
          "text-gray-400": selectedOption == null,
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
}
