import { FormDataService } from "@/utils";
import { hasElementOfArray } from "@/utils/services/common-service";
import { extractErrorMessage } from "@/utils/services/error-handler-service";

import { HttpErrorDto, IProfileDto, IProfileUpdateDto } from "../dtos";
import {
  ERoles,
  HttpError,
  IGroup,
  IMember,
  IProfile,
  IProfileUpdate,
} from "../models";
import { AuthAccountMapper } from "./auth-account.mapper";
import { GenderMapper } from "./base-mappers/gender.mapper";
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
      gender: GenderMapper.fromDto(dto.gender),
      department: DepartmentMapper.fromDto(dto.department),
      isRole: compareRole(authAccountModel.groups),
    };
  }

  public static httpErrorFromDto(
    errorDto: HttpErrorDto<IProfileUpdateDto>
  ): HttpError<IProfileUpdate> {
    const {
      email,
      first_name,
      student_id,
      phone_number,
      address,
      home_town,
      last_name,
      avatar,
      gender,
      dob,
      class_name,
    } = errorDto.details;
    return {
      error: errorDto.error,
      detail: {
        email: extractErrorMessage(email),
        first_name: extractErrorMessage(first_name),
        student_id: extractErrorMessage(student_id),
        phone_number: extractErrorMessage(phone_number),
        address: extractErrorMessage(address),
        home_town: extractErrorMessage(home_town),
        last_name: extractErrorMessage(last_name),
        avatar: extractErrorMessage(avatar),
        gender: extractErrorMessage(gender),
        dob: extractErrorMessage(dob),
        class_name: extractErrorMessage(class_name),
      },
    };
  }

  public static fromMemberModel(
    currentUser: IProfile,
    model: IMember
  ): IProfile {
    return {
      id: currentUser.id,
      gender: model.gender,
      phone_number: model.phone_number,
      student_id: model.student_id,
      home_town: model.home_town,
      dob: model.dob,
      class_name: model.class_name,
      avatar: model.avatar,
      address: model.address,
      department: model.department,
      organization: currentUser.organization,
      profile_id: model.id,
      first_name: model.auth_account.first_name,
      last_name: model.auth_account.last_name,
      full_name: model.auth_account.full_name,
      email: model.auth_account.email,
      groups: model.auth_account.groups,
      isRole: compareRole(model.auth_account.groups),
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
      gender: GenderMapper.toDto(model.gender),
    };
  }

  public static toFormData(model: IProfileUpdate): FormData {
    const dataDto = this.toUpdateDto(model);
    return FormDataService.repairFormData(dataDto);
  }
}
