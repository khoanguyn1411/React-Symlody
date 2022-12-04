import { FormDataService } from "@/utils";
import { extractErrorMessage } from "@/utils/services/error-handler-service";

import { HttpErrorDto, ProfileCreationDto, ProfileDto } from "../dtos";
import { HttpError, Member, Profile, ProfileCreation } from "../models";
import { authAccountMapper } from "./auth-account.mapper";
import { genderMapper } from "./base-mappers/gender.mapper";
import { isRoleMapper } from "./base-mappers/is-role.mapper";
import {
  IMapperFromDto,
  IMapperToCreationDto,
  IMapperToHttpError,
} from "./base-mappers/mapper";
import { departmentMapper } from "./department.mapper";
import { organizationMapper } from "./organization.mapper";

export class ProfileMapper
  implements
    IMapperFromDto<ProfileDto, Profile>,
    IMapperToCreationDto<ProfileCreationDto, ProfileCreation>,
    IMapperToHttpError<ProfileCreationDto, ProfileCreation>
{
  public fromDto(dto: ProfileDto): Profile {
    const authAccountModel = authAccountMapper.fromDto(dto);
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
      organization: organizationMapper.fromDto(dto.organization),
      gender: genderMapper.fromDto(dto.gender),
      department: departmentMapper.fromDto(dto.department),
      isRole: isRoleMapper.fromGroupModel(authAccountModel.groups),
    };
  }

  public httpErrorFromDto(
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

  public fromMember(currentUser: Profile, model: Member): Profile {
    const authAccountModel = authAccountMapper.fromInheritance(
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
      isRole: isRoleMapper.fromGroupModel(model.authAccount.groups),
    };
  }
  public toCreationDto(model: ProfileCreation): ProfileCreationDto {
    const authAccountDto = authAccountMapper.toCreationDto(model);
    return {
      ...authAccountDto,
      dob: model.dob,
      class_name: model.className,
      student_id: model.studentId,
      address: model.address,
      phone_number: model.phoneNumber,
      home_town: model.homeTown,
      gender: genderMapper.toDto(model.gender),
    };
  }

  public toFormData(model: ProfileCreation): FormData {
    const dataDto = this.toCreationDto(model);
    return FormDataService.repairFormData(dataDto);
  }
}

export const profileMapper = new ProfileMapper();
