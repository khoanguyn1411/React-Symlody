import { images } from "@/assets/images";
import { TItemListSelect, TNodataConfig } from "@/components";
import { GeneratorService } from "@/utils";

export const PROPERTY_NO_DATA_CONFIG: TNodataConfig = {
  title: "Thêm tài sản mới",
  content:
    "Lập danh sách tài sản và quản lý tài sản một cách dễ dàng và tiện lợi.",
  buttonTitle: "Thêm tài sản",
  imageSrc: images.noData.asset,
};

export const PROPERTY_FILTER_VALUE = {
  isArchived: "is-archived",
  all: "get-all",
  inUse: "in-use",
} as const;

export const PROPERTY_FILTER_OPTIONS: TItemListSelect[] = [
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

export const PROPERTY_MESSAGE =
  GeneratorService.generateStatusMessageFor("tài sản");
