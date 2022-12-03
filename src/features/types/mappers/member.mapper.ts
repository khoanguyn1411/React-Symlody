import { extractErrorMessage } from "@/utils/services/error-handler-service";

import { HttpErrorDto, MemberCreationDto, MemberDto } from "../dtos";
import { HttpError, Member, MemberCreation } from "../models";
import { AuthAccountMapper } from "./auth-account.mapper";
import { DateMapper } from "./base-mappers/date.mapper";
import { GenderMapper } from "./base-mappers/gender.mapper";
import { NameMapper } from "./base-mappers/name.mapper";
import { DepartmentMapper } from "./department.mapper";

export class MemberMapper {
  public static fromDto(dto: MemberDto): Member {
    return {
      id: dto.id,
      className: dto.class_name,
      avatar: dto.avatar,
      studentId: dto.student_id,
      address: dto.address,
      isArchived: dto.is_archived,
      homeTown: dto.home_town,
      phoneNumber: dto.phone_number,
      createdBy: NameMapper.fromDto(dto.created_by),
      gender: GenderMapper.fromDto(dto.gender),
      dob: DateMapper.fromDto(dto.dob),
      lastModifiedDate: DateMapper.fromDto(dto.last_modified_date),
      department: DepartmentMapper.fromDto(dto.department),
      authAccount: AuthAccountMapper.fromDto(dto.auth_account),
    };
  }

  public static httpErrorFromDto(
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
          AuthAccountMapper.validationHttpDetailErrorFromDto(auth_account),
        dob: extractErrorMessage(dob),
        gender: extractErrorMessage(gender),
        department: extractErrorMessage(department_id),
      },
    };
  }

  public static toCreateDto(model: MemberCreation): MemberCreationDto {
    return {
      class_name: model.className,
      student_id: model.studentId,
      address: model.address,
      phone_number: model.phoneNumber,
      home_town: model.homeTown,
      is_archived: model.isArchived,
      auth_account: AuthAccountMapper.toCreationDto(model.authAccount),
      dob: DateMapper.toDto(model.dob),
      gender: GenderMapper.toDto(model.gender),
      department_id: model.department ? model.department.id : null,
    };
  }

  public static toUpdateDto(model: MemberCreation): MemberCreationDto {
    return {
      class_name: model.className,
      student_id: model.studentId,
      address: model.address,
      avatar: model.avatar,
      phone_number: model.phoneNumber,
      home_town: model.homeTown,
      is_archived: model.isArchived,
      auth_account: AuthAccountMapper.toCreationDto(model.authAccount),
      dob: DateMapper.toDto(model.dob),
      gender: GenderMapper.toDto(model.gender),
      department_id: model.department ? model.department.id : null,
    };
  }
}
