import classNames from "classnames";

import { Primitive } from "@/utils/types";

import { Option } from "../../type";
type Props<T, E extends Primitive> = Option<T, E> & {
  selectedOption: Option<T, E>;
};

export function SelectDefaultOption<T, E extends Primitive>({
  suffix,
  prefix,
  label,
  value,
  selectedOption,
}: Props<T, E>): JSX.Element {
  const getValue = () => {
    if (selectedOption != null) {
      return selectedOption.value;
    }
    return null;
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
}
