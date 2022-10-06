import { FormatService } from "@/utils";

import { IMemberCreateUpdateDto, IMemberDto } from "../dtos";
import { IMember, IMemberCreateUpdate } from "../models";
import { AuthAccountMapper } from "./auth-account.mapper";
import { DepartmentMapper } from "./department.mapper";

export class MemberMapper {
  public static fromDto(dto: IMemberDto): IMember {
    return {
      ...dto,
      gender: dto.gender === 1 ? "Nam" : "Nữ",
      dob: FormatService.toDate(dto.dob, "US"),
      last_modified_date: FormatService.toDate(dto.last_modified_date, "US"),
      department: DepartmentMapper.fromDto(dto.department),
      auth_account: AuthAccountMapper.fromDto(dto.auth_account),
    };
  }

  public static toCreateDto(
    model: IMemberCreateUpdate
  ): IMemberCreateUpdateDto {
    return {
      ...model,
      dob: FormatService.toDate(model.dob, "API"),
      gender: model.gender === "Nam" ? 1 : 2,
      department: DepartmentMapper.toDto(model.department),
    };
  }

  public static toUpdateDto(
    model: IMemberCreateUpdate
  ): IMemberCreateUpdateDto {
    return {
      ...model,
      dob: FormatService.toDate(model.dob, "API"),
      gender: model.gender === "Nam" ? 1 : 2,
      department: DepartmentMapper.toDto(model.department),
    };
  }
}
