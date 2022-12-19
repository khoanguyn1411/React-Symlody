import { ErrorHandler } from "@/utils/funcs/error-handler";

import { HttpErrorDto, MemberCreationDto, MemberDto } from "../dtos";
import { HttpError, Member, MemberCreation } from "../models";
import { authAccountMapper } from "./auth-account.mapper";
import { dateMapper } from "./base-mappers/date.mapper";
import { genderMapper } from "./base-mappers/gender.mapper";
import {
  IMapperFromDto,
  IMapperToCreationDto,
  IMapperToHttpError,
} from "./base-mappers/mapper";
import { nameMapper } from "./base-mappers/name.mapper";
import { departmentMapper } from "./department.mapper";

export class MemberMapper
  implements
    IMapperFromDto<MemberDto, Member>,
    IMapperToCreationDto<MemberCreationDto, MemberCreation>,
    IMapperToHttpError<MemberCreationDto, MemberCreation>
{
  public fromDto(dto: MemberDto): Member {
    return {
      id: dto.id,
      className: dto.class_name,
      avatarUrl: dto.avatar_url,
      studentId: dto.student_id,
      address: dto.address,
      isArchived: dto.is_archived,
      homeTown: dto.home_town,
      phoneNumber: dto.phone_number,
      createdBy: nameMapper.fromDto(dto.created_by),
      gender: genderMapper.fromDto(dto.gender),
      dob: dateMapper.fromDto(dto.dob),
      lastModifiedDate: dateMapper.fromDto(dto.last_modified_date),
      department: departmentMapper.fromDto(dto.department),
      authAccount: authAccountMapper.fromDto(dto.auth_account),
    };
  }

  public httpErrorFromDto(
    errorDto: HttpErrorDto<MemberCreationDto>
  ): HttpError<MemberCreation, "authAccount"> {
    const {
      class_name,
      student_id,
      address,
      phone_number,
      home_town,
      is_archived,
      auth_account,
      dob,
      gender,
      department_id,
      non_field_errors,
    } = errorDto;
    return {
      className: ErrorHandler.extractErrorMessage(class_name),
      studentId: ErrorHandler.extractErrorMessage(student_id),
      address: ErrorHandler.extractErrorMessage(address),
      phoneNumber: ErrorHandler.extractErrorMessage(phone_number),
      homeTown: ErrorHandler.extractErrorMessage(home_town),
      isArchived: ErrorHandler.extractErrorMessage(is_archived),
      authAccount:
        authAccountMapper.validationHttpDetailErrorFromDto(auth_account),
      dob: ErrorHandler.extractErrorMessage(dob),
      gender: ErrorHandler.extractErrorMessage(gender),
      department: ErrorHandler.extractErrorMessage(department_id),
      nonFieldErrors: ErrorHandler.extractErrorMessage(non_field_errors),
    };
  }

  public toCreationDto(model: MemberCreation): MemberCreationDto {
    return {
      class_name: model.className,
      student_id: model.studentId,
      address: model.address,
      phone_number: model.phoneNumber,
      home_town: model.homeTown,
      is_archived: model.isArchived,
      auth_account: authAccountMapper.toCreationDto(model.authAccount),
      dob: dateMapper.toDto(model.dob),
      gender: genderMapper.toDto(model.gender),
      department_id: model.department ? model.department.id : null,
    };
  }
}

export const memberMapper = new MemberMapper();
