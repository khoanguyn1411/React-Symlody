import { images } from "@/assets/images";
import { TNodataConfig } from "@/components";
import { TOptionProps } from "@/components/elements/select/type";
import { generateStatusMessageFor } from "@/utils/funcs/generate-app-status-messages";

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

export const PROPERTY_FILTER_OPTIONS: TOptionProps[] = [
  {
    value: PROPERTY_FILTER_VALUE.inUse,
    label: "Đang sử dụng",
  },
  {
    value: PROPERTY_FILTER_VALUE.isArchived,
    label: "Đã lưu trữ",
  },
  {
    value: PROPERTY_FILTER_VALUE.all,
    label: "Tất cả tài sản",
  },
];

export const PROPERTY_MESSAGE = generateStatusMessageFor("tài sản");
