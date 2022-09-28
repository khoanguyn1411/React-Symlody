import { images } from "@/assets/images";
import { TItemListSelect, TNodataConfig } from "@/components";
import { GeneratorService } from "@/utils";

export const MEMBER_FILTER_VALUE = {
  isArchived: "is_archived",
  all: "get_all",
  active: "active",
} as const;

export const MEMBER_QUERY_PARAM_KEY = {
  filter: "filter",
} as const;

export const MEMBER_FILTER_OPTIONS: readonly TItemListSelect[] = [
  {
    key: MEMBER_FILTER_VALUE.active,
    value: "Đang hoạt động",
  },
  {
    key: MEMBER_FILTER_VALUE.isArchived,
    value: "Hết nhiệm kỳ",
  },
  {
    key: MEMBER_FILTER_VALUE.all,
    value: "Tất cả thành viên",
  },
];

export const MEMBER_NO_DATA_CONFIG: TNodataConfig = {
  title: "Tạo thành viên",
  content:
    "Lập danh sách thành viên và quản lý các thành viên một cách dễ dàng và tiện lợi.",
  buttonTitle: "Tạo thành viên",
  imageSrc: images.noData.member,
};

export const MEMBER_MESSAGE =
  GeneratorService.generateStatusMessageFor("thành viên");
