import { images } from "@/assets/images";
import { TItemListSelect } from "@/components";

export const ASSET_NO_DATA_CONFIG = {
  title: "Thêm tài sản mới",
  content:
    "Lập danh sách tài sản và quản lý tài sản một cách dễ dàng và tiện lợi.",
  buttonTitle: "Thêm tài sản",
  imageSrc: images.noData.asset,
} as const;

export const PROPERTY_FILTER_VALUE = {
  isArchived: "is_archived",
  all: "get_all",
  inUse: "in_use",
} as const;

export const PROPERTY_QUERY_PARAM_KEY = {
  filter: "filter",
} as const;

export const PROPERTY_FILTER_OPTIONS: readonly TItemListSelect[] = [
  {
    key: PROPERTY_FILTER_VALUE.inUse,
    value: "Đang sử dụng",
  },
  {
    key: PROPERTY_FILTER_VALUE.isArchived,
    value: "Đã lưu trữ",
  },
  {
    key: PROPERTY_FILTER_VALUE.all,
    value: "Tất cả tài sản",
  },
];
