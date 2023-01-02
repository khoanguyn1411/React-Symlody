import classNames from "classnames";

import { Checkbox } from "@/components/elements/checkbox";
import { Primitive } from "@/utils/types";

import { Option } from "../../type";

type Props<T, E extends Primitive> = Option<T, E> & {
  selectedOption: Option<T, E>[];
};

export function SelectMultipleOption<T, E extends Primitive>({
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
