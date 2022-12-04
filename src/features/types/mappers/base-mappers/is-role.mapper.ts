import { hasElementOfArray } from "@/utils/services/common-service";

import { Group, Roles } from "../../models";

const compareRole = (groups: Group[]) => (roles: Roles[]) => {
  const groupsNameList = groups.map((group) => group.name);
  // System Admin has whole permission of apps so we don't need to check for roles.
  if (groupsNameList.includes(Roles.SystemAdmin)) {
    return true;
  }
  return hasElementOfArray(groupsNameList, roles);
};

export class IsRoleMapper {
  public static fromGroupModel(groupModels: Group[]) {
    return compareRole(groupModels);
  }
}
