import { hasElementOfArray } from "@/utils/funcs/has-element-of-array";

import { Group, Roles } from "../../models";

export const MANAGER_ROLES = [
  Roles.EventManager,
  Roles.MemberManager,
  Roles.NotificationManager,
  Roles.PropertyManager,
];

const compareRole =
  (groups: Group[]) => (roles: Roles[] | "manager" | "member") => {
    const groupNameList = groups.map((group) => group.name);
    if (groupNameList.includes(Roles.SystemAdmin)) {
      return true;
    }
    if (roles === "manager") {
      return hasElementOfArray(groupNameList, MANAGER_ROLES);
    }
    if (roles === "member") {
      return groupNameList.includes(Roles.Member) && groupNameList.length === 1;
    }
    return hasElementOfArray(groupNameList, roles);
  };

export class IsRoleMapper {
  public fromGroupModel(groupModels: Group[]) {
    return compareRole(groupModels);
  }
}

export const isRoleMapper = new IsRoleMapper();
