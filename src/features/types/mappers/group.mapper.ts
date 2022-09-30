import { GeneratorService } from "@/utils";

import { ERolesDto, IMemberDto } from "../dtos";
import { ERoles, IMember } from "../models";

export const ROLE_MAP_FROM_DTO: Readonly<Record<ERolesDto, ERoles>> = {
  [ERolesDto.EventManager]: ERoles.EventManager,
  [ERolesDto.Member]: ERoles.Member,
  [ERolesDto.MemberManager]: ERoles.MemberManager,
  [ERolesDto.NotificationManager]: ERoles.NotificationManager,
  [ERolesDto.PropertyManager]: ERoles.PropertyManager,
  [ERolesDto.SystemAdmin]: ERoles.SystemAdmin,
  [ERolesDto.Lead]: ERoles.Lead,
};

export const ROLE_MAP_TO_DTO = GeneratorService.generateReverseDto<
  ERoles,
  ERolesDto
>(ROLE_MAP_FROM_DTO, true);

export class GroupMapper {
  public static fromDto(dto: IMemberDto["groups"]): IMember["groups"] {
    return dto.map((id) => ROLE_MAP_FROM_DTO[id]);
  }

  public static toDto(model: IMember["groups"]): IMemberDto["groups"] {
    const roleDto = model.map((model) => ROLE_MAP_TO_DTO[model] as ERolesDto);
    if (roleDto.includes(ERolesDto.Member)) {
      return roleDto;
    }
    return [...roleDto, ERolesDto.Member];
  }
}
