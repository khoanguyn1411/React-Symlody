import { GeneratorService } from "@/utils";

import { GroupDto, RolesDto } from "../dtos";
import { Group, Roles, RolesID, RolesManagerSortName } from "../models";
import { IMapperFromDto } from "./base-mappers/mapper";

export const ROLE_MAP_FROM_DTO: Readonly<Record<RolesDto, Roles>> = {
  [RolesDto.EventManager]: Roles.EventManager,
  [RolesDto.Member]: Roles.Member,
  [RolesDto.MemberManager]: Roles.MemberManager,
  [RolesDto.NotificationManager]: Roles.NotificationManager,
  [RolesDto.PropertyManager]: Roles.PropertyManager,
  [RolesDto.SystemAdmin]: Roles.SystemAdmin,
  [RolesDto.Lead]: Roles.Lead,
};

export const ROLE_MAP_TO_DTO =
  GeneratorService.generateReverseRecord(ROLE_MAP_FROM_DTO);

export const ROLE_MANAGER_FROM_SORT_NAME_TO_MODEL: Readonly<
  Record<RolesManagerSortName, Roles>
> = {
  [RolesManagerSortName.MemberManager]: Roles.MemberManager,
  [RolesManagerSortName.PropertyManager]: Roles.PropertyManager,
};

export const ROLE_MANAGER_FROM_MODEL_TO_SORT_NAME =
  GeneratorService.generateReverseRecord(ROLE_MANAGER_FROM_SORT_NAME_TO_MODEL);

export const ROLE_MAP_TO_ID: Readonly<Record<Roles, RolesID>> = {
  [Roles.EventManager]: RolesID.EventManager,
  [Roles.Member]: RolesID.Member,
  [Roles.MemberManager]: RolesID.MemberManager,
  [Roles.NotificationManager]: RolesID.NotificationManager,
  [Roles.PropertyManager]: RolesID.PropertyManager,
  [Roles.SystemAdmin]: RolesID.SystemAdmin,
  [Roles.Lead]: RolesID.Lead,
};

export const ROLE_IDS_MAP_TO_DTO: Readonly<Record<RolesID, RolesDto>> = {
  [RolesID.EventManager]: RolesDto.EventManager,
  [RolesID.Member]: RolesDto.Member,
  [RolesID.MemberManager]: RolesDto.MemberManager,
  [RolesID.NotificationManager]: RolesDto.NotificationManager,
  [RolesID.PropertyManager]: RolesDto.PropertyManager,
  [RolesID.SystemAdmin]: RolesDto.SystemAdmin,
  [RolesID.Lead]: RolesDto.Lead,
};

export class GroupMapper implements IMapperFromDto<GroupDto, Group> {
  public fromDto(dto: GroupDto): Group {
    const groupNameModel = ROLE_MAP_FROM_DTO[dto.name];
    return {
      id: dto.id,
      name: groupNameModel,
    };
  }
}

export const groupMapper = new GroupMapper();
