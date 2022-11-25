import { FormDataService } from "@/utils";
import { hasElementOfArray } from "@/utils/services/common-service";

import { IProfileDto, IProfileUpdateDto } from "../dtos";
import { ERoles, IGroup, IMember, IProfile, IProfileUpdate } from "../models";
import { AuthAccountMapper } from "./auth-account.mapper";
import { DepartmentMapper } from "./department.mapper";

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
    const authAccountModel = AuthAccountMapper.fromDto({
      email: dto.email,
      first_name: dto.first_name,
      last_name: dto.last_name,
      groups: dto.groups,
    });
    return {
      ...dto,
      ...authAccountModel,
      gender: dto.gender === 1 ? "Nam" : "Nữ",
      department: DepartmentMapper.fromDto(dto.department),
      isRole: compareRole(authAccountModel.groups),
    };
  }

  public static fromMemberModel(
    currentUser: IProfile,
    model: IMember
  ): IProfile {
    return {
      ...currentUser,
      ...model,
      id: currentUser.id,
    };
  }
  public static toUpdateDto(model: IProfileUpdate): IProfileUpdateDto {
    const authAccountDto = AuthAccountMapper.toDto({
      email: model.email,
      first_name: model.first_name,
      last_name: model.last_name,
    });
    return {
      ...model,
      ...authAccountDto,
      gender: model.gender === "Nam" ? 1 : 2,
    };
  }

  public static toFormData(model: IProfileUpdate): FormData {
    const dataDto = this.toUpdateDto(model);
    return FormDataService.repairFormData(dataDto);
  }
}
