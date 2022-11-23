import { GeneratorService } from "@/utils";

import { ERolesDto, IGroupCreateUpdateDto, IGroupDto } from "../dtos";
import { ERoles, ERolesID, ERolesManagerSortName, IGroup } from "../models";

export const ROLE_MAP_FROM_DTO: Readonly<Record<ERolesDto, ERoles>> = {
  [ERolesDto.EventManager]: ERoles.EventManager,
  [ERolesDto.Member]: ERoles.Member,
  [ERolesDto.MemberManager]: ERoles.MemberManager,
  [ERolesDto.NotificationManager]: ERoles.NotificationManager,
  [ERolesDto.PropertyManager]: ERoles.PropertyManager,
  [ERolesDto.SystemAdmin]: ERoles.SystemAdmin,
  [ERolesDto.Lead]: ERoles.Lead,
};

export const ROLE_MAP_TO_DTO =
  GeneratorService.generateReverseDto(ROLE_MAP_FROM_DTO);

export const ROLE_MANAGER_FROM_SORT_NAME_TO_MODEL: Readonly<
  Record<ERolesManagerSortName, ERoles>
> = {
  [ERolesManagerSortName.MemberManager]: ERoles.MemberManager,
  [ERolesManagerSortName.PropertyManager]: ERoles.PropertyManager,
};

export const ROLE_MANAGER_FROM_MODEL_TO_SORT_NAME =
  GeneratorService.generateReverseDto(ROLE_MANAGER_FROM_SORT_NAME_TO_MODEL);

export const ROLE_MAP_TO_ID: Readonly<Record<ERoles, ERolesID>> = {
  [ERoles.EventManager]: ERolesID.EventManager,
  [ERoles.Member]: ERolesID.Member,
  [ERoles.MemberManager]: ERolesID.MemberManager,
  [ERoles.NotificationManager]: ERolesID.NotificationManager,
  [ERoles.PropertyManager]: ERolesID.PropertyManager,
  [ERoles.SystemAdmin]: ERolesID.SystemAdmin,
  [ERoles.Lead]: ERolesID.Lead,
};

export const ROLE_IDS_MAP_TO_DTO: Readonly<Record<ERolesID, ERolesDto>> = {
  [ERolesID.EventManager]: ERolesDto.EventManager,
  [ERolesID.Member]: ERolesDto.Member,
  [ERolesID.MemberManager]: ERolesDto.MemberManager,
  [ERolesID.NotificationManager]: ERolesDto.NotificationManager,
  [ERolesID.PropertyManager]: ERolesDto.PropertyManager,
  [ERolesID.SystemAdmin]: ERolesDto.SystemAdmin,
  [ERolesID.Lead]: ERolesDto.Lead,
};

export class GroupMapper {
  public static fromDto(dto: IGroupDto): IGroup {
    const groupNameModel = ROLE_MAP_FROM_DTO[dto.name];
    return {
      id: dto.id,
      name: groupNameModel,
    };
  }

  public static toDto(model: IGroup): IGroupCreateUpdateDto {
    return {
      name: ROLE_MAP_TO_DTO[model.name],
    };
  }
}
