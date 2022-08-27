import { TItemListSelect } from "@/components";

export const MEMBER_FILTER_VALUE = {
  inActive: "in_active",
  all: "all",
} as const;

export const MEMBER_QUERY_PARAM_KEY = {
  filter: "filter",
} as const;

export const FILTER_MEMBER_OPTIONS: readonly TItemListSelect[] = [
  {
    key: "active",
    value: "Đang hoạt động",
  },
  {
    key: MEMBER_FILTER_VALUE.inActive,
    value: "Hết nhiệm kỳ",
  },
  {
    key: MEMBER_FILTER_VALUE.all,
    value: "Tất cả thành viên",
  },
];
