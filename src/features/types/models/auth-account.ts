import { generateFullName } from "@/utils/funcs/generate-full-name";
import { hasElementOfArray } from "@/utils/funcs/has-element-of-array";
import { StrictOmit } from "@/utils/types";

import { Group, MANAGER_ROLES, Roles } from "./group";
import { IsRole } from "./is-role";

interface IAuthAccount {
  email?: string;
  firstName: string;
  groups: Group[];
  lastName: string;
}

function initializeIsRoleFn(groups: Group[]): IsRole["isRole"] {
  return (roles: Roles[] | "manager" | "member") => {
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
}

export class AuthAccount implements IAuthAccount {
  public email?: string;
  public firstName: string;
  public groups: Group[];
  public lastName: string;
  public fullName: string;
  public isRole: IsRole["isRole"];
  public constructor(data: IAuthAccount) {
    this.email = data.email;
    this.firstName = data.firstName;
    this.groups = data.groups;
    this.lastName = data.lastName;
    this.fullName = generateFullName(data.lastName, data.firstName);
    this.isRole = initializeIsRoleFn(data.groups);
  }
}

export type AuthAccountCreation = StrictOmit<
  AuthAccount,
  "groups" | "fullName" | "isRole"
>;
