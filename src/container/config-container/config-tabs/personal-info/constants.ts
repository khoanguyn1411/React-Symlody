import { TOptionProps } from "@/components/elements/select/type";
import { provinces } from "@/constants";
import { generateStatusMessageFor } from "@/utils/services/generate-service";

export const PERSONAL_INFO_MESSAGES = generateStatusMessageFor("thông tin");

export const PROVINCES_LIST: TOptionProps[] = provinces.map((p) => ({
  value: p.city,
  label: p.city,
}));
