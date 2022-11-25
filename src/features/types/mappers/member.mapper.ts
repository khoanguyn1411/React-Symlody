import { FormatService } from "@/utils";

import { IMemberCreateUpdateDto, IMemberDto } from "../dtos";
import { IMember, IMemberCreateUpdate } from "../models";
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
