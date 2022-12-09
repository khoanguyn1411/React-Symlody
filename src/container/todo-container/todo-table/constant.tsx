import { TOptionProps } from "@/components/elements/select/type";

export const PRIORITY_LIST: boolean[] = [true, false];

export const PRIORITY_LIST_OPTIONS: TOptionProps[] = PRIORITY_LIST.map(
  (option) => ({ label: option.toString(), value: option.toString() })
);
