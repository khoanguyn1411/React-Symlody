import { ErrorHandler } from "@/utils/funcs/error-handler";
import { repairFormData } from "@/utils/funcs/repair-form-data";

import { HttpErrorDto, ProfileCreationDto, ProfileDto } from "../dtos";
import { HttpError, Member, Profile, ProfileCreation } from "../models";
import { authAccountMapper } from "./auth-account.mapper";
import { dateMapper } from "./base-mappers/date.mapper";
import { genderMapper } from "./base-mappers/gender.mapper";
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
      phoneNumber: dto.phone_number ?? "",
      studentId: dto.student_id ?? "",
      homeTown: dto.home_town ?? "",
      dob: dateMapper.fromDto(dto.dob) ?? "",
      className: dto.class_name ?? "",
      avatarUrl: dto.avatar_url,
      address: dto.address ?? "",
      memberId: dto.profile_id,
      organization: organizationMapper.fromDto(dto.organization),
      gender: genderMapper.fromDto(dto.gender),
      department: departmentMapper.fromDto(dto.department),
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
      non_field_errors,
      class_name,
    } = errorDto;
    return {
      email: ErrorHandler.extractErrorMessage(email),
      firstName: ErrorHandler.extractErrorMessage(first_name),
      studentId: ErrorHandler.extractErrorMessage(student_id),
      phoneNumber: ErrorHandler.extractErrorMessage(phone_number),
      address: ErrorHandler.extractErrorMessage(address),
      homeTown: ErrorHandler.extractErrorMessage(home_town),
      lastName: ErrorHandler.extractErrorMessage(last_name),
      avatar: ErrorHandler.extractErrorMessage(avatar),
      gender: ErrorHandler.extractErrorMessage(gender),
      dob: ErrorHandler.extractErrorMessage(dob),
      className: ErrorHandler.extractErrorMessage(class_name),
      nonFieldErrors: ErrorHandler.extractErrorMessage(non_field_errors),
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
      avatarUrl: model.avatarUrl,
      address: model.address,
      department: model.department,
      organization: currentUser.organization,
      memberId: model.id,
      isRole: authAccountModel.isRole,
    };
  }
  public toCreationDto(model: ProfileCreation): ProfileCreationDto {
    const authAccountDto = authAccountMapper.toCreationDto(model);
    return {
      ...authAccountDto,
      avatar: model.avatar,
      dob: dateMapper.toDto(model.dob),
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
    return repairFormData(dataDto);
  }
}

export const profileMapper = new ProfileMapper();
