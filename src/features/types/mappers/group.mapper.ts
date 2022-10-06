import { GeneratorService } from "@/utils";

import { ERolesDto, IGroupCreateUpdateDto, IGroupDto } from "../dtos";
import { ERoles, IGroup } from "../models";

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
>(ROLE_MAP_FROM_DTO, false);

export class GroupMapper {
  public static fromDto(dto: IGroupDto): IGroup {
    return {
      id: dto.id,
      name: ROLE_MAP_FROM_DTO[dto.name],
    };
  }

  public static toDto(model: IGroup): IGroupCreateUpdateDto {
    return {
      name: ROLE_MAP_TO_DTO[model.name],
    };
  }
}
