import { hasElementOfArray } from "@/utils/services/common-service";

import { IProfileDto } from "../dtos";
import { ERoles, IGroup, IMember, IProfile } from "../models";
import { DepartmentMapper } from "./department.mapper";
import { GroupMapper } from "./group.mapper";

const compareRole = (groups: IGroup[]) => (roles: ERoles[]) => {
  const groupsNameList = groups.map((group) => group.name);
  // System Admin has whole permission of apps so we don't need to check for roles.
  if (groupsNameList.includes(ERoles.SystemAdmin)) {
    return true;
  }
  return hasElementOfArray(groupsNameList, roles);
};

export class ProfileMapper {
  public static fromDto(dto: IProfileDto): IProfile {
    const groups = dto.groups.map((group) => GroupMapper.fromDto(group));
    return {
      ...dto,
      gender: dto.gender === 1 ? "Nam" : "Nữ",
      department: DepartmentMapper.fromDto(dto.department),
      groups,
      isRole: compareRole(groups),
    };
  }

  public static fromMemberModel(
    currentUser: IProfile,
    model: IMember
  ): IProfile {
    return {
      ...currentUser,
      ...model,
    };
  }
}
