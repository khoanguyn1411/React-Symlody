import { Option } from "@/components/elements/select/type";
import { RolesManagerSortName } from "@/features/types";
import { enumToArray } from "@/utils/funcs/enum-to-array";
import { generateStatusMessageFor } from "@/utils/funcs/generate-app-status-messages";

export enum EPermissionOptions {
  Lead = "Quản lý chung",
  Manager = "Quản lý",
  Member = "Thành viên",
}

export const PERMISSION_OPTIONS: Option[] = enumToArray(EPermissionOptions).map(
  (item) => ({ value: item, label: item })
);

export const MANAGE_OPTIONS: Option[] = enumToArray(RolesManagerSortName).map(
  (item) => ({ value: item, label: item })
);

export const ROLE_PERMISSION_MESSAGE = generateStatusMessageFor("quyền");

export const ROLE_PERMISSION_TO_NOTE: Readonly<
  Record<EPermissionOptions, string>
> = {
  [EPermissionOptions.Lead]: "Toàn quyền sử dụng tính năng trên hệ thống",
  [EPermissionOptions.Manager]:
    "Có quyền thêm/xoá/sửa tính năng được thiết lập",
  [EPermissionOptions.Member]: "Chỉ được cấp quyền xem dữ liệu",
};

export const PERMISSION_LIST = enumToArray(EPermissionOptions);
