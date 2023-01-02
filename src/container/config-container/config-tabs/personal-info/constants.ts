import { Option } from "@/components/elements/select/type";
import { provinces } from "@/constants";
import { generateStatusMessageFor } from "@/utils/funcs/generate-app-status-messages";

export const PERSONAL_INFO_MESSAGES = generateStatusMessageFor("thông tin");

export const PROVINCES_LIST: Option[] = provinces.map((p) => ({
  value: p.city,
  label: p.city,
}));
