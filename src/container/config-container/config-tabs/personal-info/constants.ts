import { TItemListSelect } from "@/components";
import { provinces } from "@/constants";
import { generateStatusMessageFor } from "@/utils/services/generate-service";

export const PERSONAL_INFO_MESSAGES = generateStatusMessageFor("thông tin");

export const PROVINCES_LIST: TItemListSelect[] = provinces.map((p) => ({
  value: p.city,
  key: p.city,
}));
