import { FormatService, FormDataService } from "@/utils";

import { IMemberCreateUpdateDto, IMemberDto } from "../dtos";
import { IMember, IMemberCreateUpdate } from "../models";
import { AuthAccountMapper } from "./auth-account.mapper";
import { DepartmentMapper } from "./department.mapper";

export class MemberMapper {
  public static fromDto(dto: IMemberDto): IMember {
    return {
      ...dto,
      gender: dto.gender === 1 ? "Nam" : "Nữ",
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
      ...model,
      dob: FormatService.toDateString(model.dob, "API"),
      gender: model.gender === "Nam" ? 1 : 2,
      department_id: model.department.id,
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
      gender: model.gender === "Nam" ? 1 : 2,
      department_id: model.department ? model.department.id : undefined,
    };
  }

  public static toFormData(model: IMemberCreateUpdate): FormData {
    const dataDto = this.toUpdateDto(model);
    return FormDataService.repairFormData(dataDto);
  }
}
