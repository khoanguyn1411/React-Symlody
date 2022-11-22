import { TItemListSelect } from "@/components";
import { TOptionProps } from "@/components/elements/select/type";
import { ERolesManagerSortName } from "@/features/types";
import {
  generateArrayFromEnum,
  generateStatusMessageFor,
} from "@/utils/services/generate-service";

export enum EPermissionOptions {
  Lead = "Quản lý chung",
  Manager = "Quản lý",
  Member = "Thành viên",
}

export const PERMISSION_OPTIONS: TItemListSelect[] = generateArrayFromEnum(
  EPermissionOptions
).map((item) => ({ value: item }));

export const MANAGE_OPTIONS: TOptionProps[] = generateArrayFromEnum(
  ERolesManagerSortName
).map((item) => ({ value: item, label: item }));

export const ROLE_PERMISSION_MESSAGE = generateStatusMessageFor("quyền");

export const ROLE_PERMISSION_ERROR_MESSAGE = {
  NO_LEADER:
    "An organization must have an active leader. Please add another active leader before remove this member from leader role.",
} as const;

export const ROLE_PERMISSION_ERROR_TO_READABLE_STRING: Readonly<
  Record<string, string>
> = {
  [ROLE_PERMISSION_ERROR_MESSAGE.NO_LEADER]: "Tổ chức phải có ít nhật 1 leader",
};

export const ROLE_PERMISSION_TO_NOTE: Readonly<
  Record<EPermissionOptions, string>
> = {
  [EPermissionOptions.Lead]: "Toàn quyền sử dụng tính năng trên hệ thống",
  [EPermissionOptions.Manager]:
    "Có quyền thêm/xoá/sửa tính năng được thiết lập",
  [EPermissionOptions.Member]: "Chỉ được cấp quyền xem dữ liệu",
};

export const PERMISSION_LIST = generateArrayFromEnum(EPermissionOptions);
