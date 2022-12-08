import { images } from "@/assets/images";
import { TNodataConfig } from "@/components";
import { TOptionProps } from "@/components/elements/select/type";
import { GeneratorService } from "@/utils";

export const MEMBER_FILTER_VALUE = {
  isArchived: "is-archived",
  all: "get-all",
  active: "active",
} as const;

export const MEMBER_FILTER_OPTIONS: TOptionProps[] = [
  {
    value: MEMBER_FILTER_VALUE.active,
    label: "Đang hoạt động",
  },
  {
    value: MEMBER_FILTER_VALUE.isArchived,
    label: "Hết nhiệm kỳ",
  },
  {
    value: MEMBER_FILTER_VALUE.all,
    label: "Tất cả thành viên",
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
