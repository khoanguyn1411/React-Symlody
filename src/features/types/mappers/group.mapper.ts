import { ERolesDto, IAuthAccountDto } from "../dtos";
import { ERoles, IAuthAccount } from "../models";

export const ROLE_MAP_FROM_DTO: Readonly<Record<ERolesDto, ERoles>> = {
  [ERolesDto.EventManager]: ERoles.EventManager,
  [ERolesDto.Member]: ERoles.Member,
  [ERolesDto.MemberManager]: ERoles.MemberManager,
  [ERolesDto.NotificationManager]: ERoles.NotificationManager,
  [ERolesDto.PropertyManager]: ERoles.PropertyManager,
  [ERolesDto.SystemAdmin]: ERoles.SystemAdmin,
  [ERolesDto.Lead]: ERoles.Lead,
};

export class GroupMapper {
  public static fromDto(
    dto: IAuthAccountDto["groups"]
  ): IAuthAccount["groups"] {
    return dto.map((id) => ROLE_MAP_FROM_DTO[id]);
  }

  public static toDto(
    model: IAuthAccount["groups"]
  ): IAuthAccountDto["groups"] {
    const keys = Object.keys(ROLE_MAP_FROM_DTO);
    const roleDto = model.map(
      (item) =>
        Number(keys.find((key) => ROLE_MAP_FROM_DTO[key] === item)) as ERolesDto
    );
    if (roleDto.includes(ERolesDto.Member)) {
      return roleDto;
    }
    return [...roleDto, ERolesDto.Member];
  }
}
