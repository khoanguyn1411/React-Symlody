import classNames from "classnames";
import React, { Fragment, ReactNode } from "react";

import { TStyle } from "@/components/elements/input/type";
import { Primitive } from "@/utils/types";

import { Option } from "../../type";

type Props<T, E extends Primitive> = {
  selectedOption: Option<T, E>[];
  style: TStyle;
  placeholder: ReactNode;
  handleSetSelectedItem: (option: Option<T, E>) => () => void;
  renderDisplayOption: (
    option: Option<T, E>,
    removeOptionFn: () => void
  ) => ReactNode;
};
export function SelectMultipleDisplay<T, E extends Primitive>({
  selectedOption,
  style,
  placeholder,
  handleSetSelectedItem,
  renderDisplayOption,
}: Props<T, E>): JSX.Element {
  return (
    <div className="flex flex-wrap gap-3">
      {selectedOption.length === 0 && (
        <h1 className="text-gray-400">{placeholder}</h1>
      )}
      {selectedOption.map((option, index) => {
        if (renderDisplayOption) {
          return (
            <Fragment key={`${option.value}-${index}`}>
              {renderDisplayOption(option, handleSetSelectedItem(option))}
            </Fragment>
          );
        }
        return (
          <div
            className={classNames(
              "relative flex items-center px-2 h-6 text-sm shadow-md  transition-all duration-200 space-x-2 min-w-max rounded-md",
              style === "modal"
                ? "bg-white hover:bg-gray-50"
                : "bg-gray-100 hover:bg-gray-200"
            )}
            key={`${option.value}-${index}`}
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
}
