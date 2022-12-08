import classNames from "classnames";
import React, { ReactNode } from "react";

import { TStyle } from "@/components/elements/input/type";

import { TOptionProps } from "../../type";

type Props = {
  selectedOption: TOptionProps[];
  style: TStyle;
  placeholder: string;
  handleSetSelectedItem: (option: TOptionProps) => () => void;
  renderDisplayOption: (
    option: TOptionProps,
    removeOptionFn: () => void
  ) => ReactNode;
};
export const SelectMultipleDisplay: React.FC<Props> = ({
  selectedOption,
  style,
  placeholder,
  handleSetSelectedItem,
  renderDisplayOption,
}) => {
  return (
    <div className="flex flex-wrap gap-3">
      {selectedOption.length === 0 && (
        <h1 className="text-gray-400">{placeholder}</h1>
      )}
      {selectedOption.map((option, index) => {
        if (renderDisplayOption) {
          return renderDisplayOption(option, handleSetSelectedItem(option));
        }
        return (
          <div
            className={classNames(
              "relative flex items-center px-2 h-6 text-sm shadow-md  transition-all duration-200 space-x-2 min-w-max rounded-md",
              style === "modal"
                ? "bg-white hover:bg-gray-50"
                : "bg-gray-100 hover:bg-gray-200"
            )}
            key={option.value + index}
          >
            <span>{option.label}</span>
            <span
              className="flex items-center h-full text-gray-400"
              aria-hidden
              onClick={handleSetSelectedItem(option)}
            >
              <i className="fas fa-times" />
            </span>
          </div>
        );
      })}
    </div>
  );
};
