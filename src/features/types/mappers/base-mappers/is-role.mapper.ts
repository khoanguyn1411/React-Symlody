import { hasElementOfArray } from "@/utils/services/common-service";

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
    if (roles === "manager") {
      return hasElementOfArray(groupNameList, MANAGER_ROLES);
    }
    if (roles === "member") {
      return groupNameList.includes(Roles.Member) && groupNameList.length === 1;
    }
    return hasElementOfArray(groupNameList, roles);
  };

export class IsRoleMapper {
  public static fromGroupModel(groupModels: Group[]) {
    return compareRole(groupModels);
  }
}
