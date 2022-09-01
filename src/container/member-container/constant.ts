import { images } from "@/assets/images";
import { TItemListSelect } from "@/components";

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

export const MEMBER_MESSAGE = {
  delete: {
    success: "Xóa thành viên thành công.",
    error: "Xóa thành viên thất bại.",
  },
  create: {
    error: `Tạo thành viên thất bại.`,
    success: `Tạo thành viên thành công.`,
  },
  update: {
    error: `Cập nhật thành viên thất bại.`,
    success: `Cập nhật thành viên thành công.`,
  },
} as const;

export const MEMBER_NO_DATA_CONFIG = {
  title: "Tạo thành viên",
  content:
    "Lập danh sách thành viên và quản lý các thành viên một cách dễ dàng và tiện lợi.",
  buttonTitle: "Tạo thành viên",
  imageSrc: images.noData.member,
} as const;
