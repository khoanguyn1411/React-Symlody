import { FormatService } from "@/utils";
import { extractErrorMessage } from "@/utils/services/error-handler-service";

import { HttpErrorDto, IMemberCreateUpdateDto, IMemberDto } from "../dtos";
import { HttpError, IMember, IMemberCreateUpdate } from "../models";
import { AuthAccountMapper } from "./auth-account.mapper";
import { DepartmentMapper } from "./department.mapper";
import { GenderMapper } from "./gender.mapper";

export class MemberMapper {
  public static fromDto(dto: IMemberDto): IMember {
    return {
      ...dto,
      gender: GenderMapper.fromDto(dto.gender),
      dob: FormatService.toDateString(dto.dob, "US"),
      last_modified_date: FormatService.toDateString(
        dto.last_modified_date,
        "US"
      ),
      department: DepartmentMapper.fromDto(dto.department),
      auth_account: AuthAccountMapper.fromDto(dto.auth_account),
    };
  }

  public static httpErrorFromDto(
    errorDto: HttpErrorDto<IMemberCreateUpdateDto>
  ): HttpError<IMemberCreateUpdate> {
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
        class_name: extractErrorMessage(class_name),
        student_id: extractErrorMessage(student_id),
        address: extractErrorMessage(address),
        phone_number: extractErrorMessage(phone_number),
        home_town: extractErrorMessage(home_town),
        is_archived: extractErrorMessage(is_archived),
        auth_account: {
          email: extractErrorMessage(auth_account.email),
          first_name: extractErrorMessage(auth_account.first_name),
          last_name: extractErrorMessage(auth_account.last_name),
        },
        dob: extractErrorMessage(dob),
        gender: extractErrorMessage(gender),
        department: extractErrorMessage(department_id),
      },
    };
  }

  public static toCreateDto(
    model: IMemberCreateUpdate
  ): IMemberCreateUpdateDto {
    return {
      class_name: model.class_name,
      student_id: model.student_id,
      address: model.address,
      phone_number: model.phone_number,
      home_town: model.home_town,
      is_archived: model.is_archived,
      auth_account: AuthAccountMapper.toDto(model.auth_account),
      dob: FormatService.toDateString(model.dob, "API"),
      gender: GenderMapper.toDto(model.gender),
      department_id: model.department ? model.department.id : undefined,
    };
  }

  public static toUpdateDto(
    model: IMemberCreateUpdate
  ): IMemberCreateUpdateDto {
    return {
      class_name: model.class_name,
      student_id: model.student_id,
      address: model.address,
      avatar: model.avatar,
      phone_number: model.phone_number,
      home_town: model.home_town,
      is_archived: model.is_archived,
      auth_account: AuthAccountMapper.toDto(model.auth_account),
      dob: FormatService.toDateString(model.dob, "API"),
      gender: GenderMapper.toDto(model.gender),
      department_id: model.department ? model.department.id : undefined,
    };
  }
}
