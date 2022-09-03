import dayjs from "dayjs";

import { IMemberCreateDto, IMemberDto, IMemberUpdateDto } from "../dtos";
import { IMember, IMemberCreate } from "../models";
import { AuthAccountMapper } from "./auth-account.mapper";
import { DepartmentMapper } from "./department.mapper";

export class MemberMapper {
  public static fromDto(dto: IMemberDto): IMember {
    return {
      ...dto,
      gender: dto.gender === 1 ? "Nam" : "Nữ",
      dob: dayjs(dto.dob).format("MM/DD/YYYY"),
      last_modified_date: dayjs(dto.dob).format("MM/DD/YYYY"),
      department: DepartmentMapper.fromDto(dto.department),
      auth_account: AuthAccountMapper.fromDto(dto.auth_account),
    };
  }

  public static toCreateDto(model: IMemberCreate): IMemberCreateDto {
    return {
      ...model,
      dob: dayjs(model.dob).format("YYYY-MM-DD"),
      gender: model.gender === "Nam" ? 1 : 2,
      auth_account: AuthAccountMapper.toDto(model.auth_account),
      department: DepartmentMapper.toDto(model.department),
    };
  }

  public static toUpdateDto(model: IMemberCreate): IMemberUpdateDto {
    return {
      ...model,
      dob: dayjs(model.dob).format("YYYY-MM-DD"),
      gender: model.gender === "Nam" ? 1 : 2,
      auth_account: AuthAccountMapper.toDto(model.auth_account),
      department: DepartmentMapper.toDto(model.department),
    };
  }
}
