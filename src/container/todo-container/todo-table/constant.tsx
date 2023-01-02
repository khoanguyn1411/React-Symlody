import { Option } from "@/components/elements/select/type";

export const PRIORITY_LIST: boolean[] = [true, false];

export const PRIORITY_LIST_OPTIONS: Option<null, boolean>[] = PRIORITY_LIST.map(
  (option) => ({ label: option.toString(), value: option })
);
