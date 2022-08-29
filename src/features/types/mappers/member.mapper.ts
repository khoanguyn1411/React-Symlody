import dayjs from "dayjs";

import {
  ERolesDto,
  IAuthAccountDto,
  IDepartmentDto,
  IMemberCreateDto,
  IMemberDto,
  IMemberUpdateDto,
} from "../dtos";
import {
  ERoles,
  IAuthAccount,
  IDepartment,
  IMember,
  IMemberCreate,
} from "../models";

export const ROLE_MAP_FROM_DTO: Readonly<Record<ERolesDto, ERoles>> = {
  [ERolesDto.EventManager]: ERoles.EventManager,
  [ERolesDto.Member]: ERoles.Member,
  [ERolesDto.MemberManager]: ERoles.MemberManager,
  [ERolesDto.NotificationManager]: ERoles.NotificationManager,
  [ERolesDto.PropertyManager]: ERoles.PropertyManager,
  [ERolesDto.SystemAdmin]: ERoles.SystemAdmin,
  [ERolesDto.Lead]: ERoles.Lead,
};

class GroupMapper {
  public static fromDto(
    dto: IAuthAccountDto["groups"]
  ): IAuthAccount["groups"] {
    return dto
      .map((id) => ROLE_MAP_FROM_DTO[id])
      .filter((item) => item !== ERoles.Member);
  }

  public static toDto(
    model: IAuthAccount["groups"]
  ): IAuthAccountDto["groups"] {
    const keys = Object.keys(ROLE_MAP_FROM_DTO);
    return model.map(
      (item) =>
        Number(keys.find((key) => ROLE_MAP_FROM_DTO[key] === item)) as ERolesDto
    );
  }
}

class AuthAccountMapper {
  public static fromDto(dto: IAuthAccountDto): IAuthAccount {
    return {
      ...dto,
      groups: GroupMapper.fromDto(dto.groups),
    };
  }
  public static toDto(model: IAuthAccount): IAuthAccountDto {
    return {
      ...model,
      groups: GroupMapper.toDto(model.groups),
    };
  }
}

class DepartmentMapper {
  public static fromDto(dto: IDepartmentDto): IDepartment {
    return { ...dto };
  }

  public static toDto(model: IDepartment): IDepartmentDto {
    return { ...model };
  }
}

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
