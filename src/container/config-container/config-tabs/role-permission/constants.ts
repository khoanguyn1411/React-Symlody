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
