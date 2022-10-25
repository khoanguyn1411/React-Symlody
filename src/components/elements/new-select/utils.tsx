import { Avatar } from "../avatar";
import { ISelectOption } from "./SelectControl";

export const convertSimpleToIconOptions = (
  options: ISelectOption[],
  shouldShowIcon?: boolean,
  shouldShowSuffix?: boolean
): ISelectOption[] => {
  return options.map((option) => ({
    icon: shouldShowIcon ? (
      typeof option?.icon === "string" ? (
        <Avatar
          src={option.icon.toString()}
          fullName={option.label}
          size="small"
        />
      ) : (
        option?.icon
      )
    ) : undefined,
    label: option.label,
    value: option.value,
    suffix: shouldShowSuffix ? option.suffix : undefined,
  }));
};
