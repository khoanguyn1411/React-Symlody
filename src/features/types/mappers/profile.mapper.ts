import { FormDataService } from "@/utils";
import { extractErrorMessage } from "@/utils/services/error-handler-service";

import { HttpErrorDto, ProfileCreationDto, ProfileDto } from "../dtos";
import { HttpError, Member, Profile, ProfileCreation } from "../models";
import { AuthAccountMapper } from "./auth-account.mapper";
import { GenderMapper } from "./base-mappers/gender.mapper";
import { IsRoleMapper } from "./base-mappers/is-role.mapper";
import { DepartmentMapper } from "./department.mapper";
import { OrganizationMapper } from "./organization.mapper";

export class ProfileMapper {
  public static fromDto(dto: ProfileDto): Profile {
    const authAccountModel = AuthAccountMapper.fromDto(dto);
    return {
      ...authAccountModel,
      id: dto.id,
      phoneNumber: dto.phone_number,
      studentId: dto.student_id,
      homeTown: dto.home_town,
      dob: dto.dob,
      className: dto.class_name,
      avatar: dto.avatar,
      address: dto.address,
      memberId: dto.profile_id,
      organization: OrganizationMapper.fromDto(dto.organization),
      gender: GenderMapper.fromDto(dto.gender),
      department: DepartmentMapper.fromDto(dto.department),
      isRole: IsRoleMapper.fromGroupModel(authAccountModel.groups),
    };
  }

  public static httpErrorFromDto(
    errorDto: HttpErrorDto<ProfileCreationDto>
  ): HttpError<ProfileCreation> {
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
        firstName: extractErrorMessage(first_name),
        studentId: extractErrorMessage(student_id),
        phoneNumber: extractErrorMessage(phone_number),
        address: extractErrorMessage(address),
        homeTown: extractErrorMessage(home_town),
        lastName: extractErrorMessage(last_name),
        avatar: extractErrorMessage(avatar),
        gender: extractErrorMessage(gender),
        dob: extractErrorMessage(dob),
        className: extractErrorMessage(class_name),
      },
    };
  }

  public static fromMember(currentUser: Profile, model: Member): Profile {
    const authAccountModel = AuthAccountMapper.fromInheritance(
      model.authAccount
    );
    return {
      ...authAccountModel,
      id: currentUser.id,
      groups: model.authAccount.groups,
      gender: model.gender,
      phoneNumber: model.phoneNumber,
      studentId: model.studentId,
      homeTown: model.homeTown,
      dob: model.dob,
      className: model.className,
      avatar: model.avatar,
      address: model.address,
      department: model.department,
      organization: currentUser.organization,
      memberId: model.id,
      isRole: IsRoleMapper.fromGroupModel(model.authAccount.groups),
    };
  }
  public static toCreationDto(model: ProfileCreation): ProfileCreationDto {
    const authAccountDto = AuthAccountMapper.toCreationDto(model);
    return {
      ...authAccountDto,
      dob: model.dob,
      class_name: model.className,
      student_id: model.studentId,
      address: model.address,
      phone_number: model.phoneNumber,
      home_town: model.homeTown,
      gender: GenderMapper.toDto(model.gender),
    };
  }

  public static toFormData(model: ProfileCreation): FormData {
    const dataDto = this.toCreationDto(model);
    return FormDataService.repairFormData(dataDto);
  }
}
