import dayjs from "dayjs";

import {
  ERolesDto,
  IAuthAccountDto,
  IDepartmentDto,
  IDepartmentDtoCU,
  IMemberDto,
  IMemberDtoCU,
} from "../dtos";
import {
  ERoles,
  IAuthAccount,
  IDepartment,
  IDepartmentCU,
  IMember,
  IMemberCU,
} from "../models";

const ROLE_MAP_FROM_DTO: Readonly<Record<ERolesDto, ERoles>> = {
  [ERolesDto.EventManager]: ERoles.EventManager,
  [ERolesDto.Member]: ERoles.Member,
  [ERolesDto.MemberManager]: ERoles.MemberManager,
  [ERolesDto.NotificationManager]: ERoles.NotificationManager,
  [ERolesDto.PropertyManager]: ERoles.PropertyManager,
  [ERolesDto.SystemAdmin]: ERoles.SystemAdmin,
  [ERolesDto.Lead]: ERoles.Lead,
};

const ROLE_MAP_TO_DTO: Readonly<Record<ERoles, ERolesDto>> = {
  [ERoles.EventManager]: ERolesDto.EventManager,
  [ERoles.Member]: ERolesDto.Member,
  [ERoles.MemberManager]: ERolesDto.MemberManager,
  [ERoles.NotificationManager]: ERolesDto.NotificationManager,
  [ERoles.PropertyManager]: ERolesDto.PropertyManager,
  [ERoles.SystemAdmin]: ERolesDto.SystemAdmin,
  [ERoles.Lead]: ERolesDto.Lead,
};

class GroupMapper {
  public static fromDto(
    dto: IAuthAccountDto["groups"]
  ): IAuthAccount["groups"] {
    return dto.map((id) => ROLE_MAP_FROM_DTO[id]);
  }

  public static toDto(
    model: IAuthAccount["groups"]
  ): IAuthAccountDto["groups"] {
    return model.map((item) => ROLE_MAP_TO_DTO[item]);
  }
}

class AuthAccountMapper {
  public static fromDto(dto: IAuthAccountDto): IAuthAccount {
    return {
      fistName: dto.first_name,
      lastName: dto.last_name,
      email: dto.email,
      groups: GroupMapper.fromDto(dto.groups),
    };
  }
  public static toDto(model: IAuthAccount): IAuthAccountDto {
    return {
      first_name: model.fistName,
      last_name: model.lastName,
      email: model.email,
      groups: GroupMapper.toDto(model.groups),
    };
  }
}

class DepartmentMapper {
  public static fromDto(dto: IDepartmentDto): IDepartment {
    return {
      name: dto.name,
      id: dto.id,
    };
  }

  public static toDto(model: IDepartmentCU): IDepartmentDtoCU {
    return {
      name: model.name,
    };
  }
}

export class MemberMapper {
  public static fromDto(dto: IMemberDto): IMember {
    return {
      id: dto.id,
      authAccount: AuthAccountMapper.fromDto(dto.auth_account),
      gender: dto.gender === 1 ? "Nam" : "Nữ",
      birthday: dayjs(dto.dob).format("MM/DD/YYYY"),
      className: dto.class_name,
      studentId: dto.student_id,
      address: dto.address,
      phone: dto.phone_number,
      home: dto.home_town,
      lastModifierDate: dayjs(dto.dob).format("MM/DD/YYYY"),
      createBy: dto.created_by,
      department: DepartmentMapper.fromDto(dto.department),
    };
  }

  public static toDto(model: IMemberCU): IMemberDtoCU {
    return {
      auth_account: AuthAccountMapper.toDto(model.authAccount),
      gender: model.gender === "Nam" ? 1 : 0,
      dob: dayjs(model.birthday).format("YYYY-MM-DD"),
      class_name: model.className,
      student_id: model.studentId,
      address: model.address,
      phone_number: model.phone,
      home_town: model.home,
      is_archived: true,
      department: DepartmentMapper.toDto(model.department),
      last_modified_by: "Khoa Nguyen",
      created_by: 123,
    };
  }
}
