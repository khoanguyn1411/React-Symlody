import { extractErrorMessage } from "@/utils/services/error-handler-service";

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
      avatar: dto.avatar,
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
    } = errorDto.details;
    return {
      error: errorDto.error,
      detail: {
        className: extractErrorMessage(class_name),
        studentId: extractErrorMessage(student_id),
        address: extractErrorMessage(address),
        phoneNumber: extractErrorMessage(phone_number),
        homeTown: extractErrorMessage(home_town),
        isArchived: extractErrorMessage(is_archived),
        authAccount:
          authAccountMapper.validationHttpDetailErrorFromDto(auth_account),
        dob: extractErrorMessage(dob),
        gender: extractErrorMessage(gender),
        department: extractErrorMessage(department_id),
      },
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
