import classNames from "classnames";

import { Checkbox } from "@/components/elements/checkbox";
import { PrimitiveType } from "@/utils/types";

import { TOptionProps } from "../../type";

type Props<T, E extends PrimitiveType> = TOptionProps<T, E> & {
  selectedOption: TOptionProps<T, E>[];
};

export function SelectMultipleOption<T, E extends PrimitiveType>({
  label,
  value,
  selectedOption,
}: Props<T, E>): JSX.Element {
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
}
