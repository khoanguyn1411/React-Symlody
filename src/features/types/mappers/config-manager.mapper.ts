import { hasElementOfArray } from "@/utils/services/compare-service";
import { generateFullName } from "@/utils/services/generate-service";

import { ERolesDto } from "../dtos";
import {
  IConfigInfoDto,
  IConfigManagerDto,
  IConfigUserUpdateDto,
} from "../dtos/config-manager.dto";
import {
  ERoles,
  IConfigInfo,
  IConfigManager,
  IConfigUserUpdate,
  IUser,
} from "../models";
import { GroupMapper, ROLE_MAP_TO_DTO, ROLE_MAP_TO_ID } from "./group.mapper";

export const MANAGER_ROLES_DTO = [
  ERolesDto.EventManager,
  ERolesDto.MemberManager,
  ERolesDto.NotificationManager,
  ERolesDto.PropertyManager,
];

export class ConfigMangerMapper {
  public static fromDto(dto: IConfigManagerDto): IConfigManager {
    return {
      managers: dto.managers.map((manager) =>
        ConfigInfoMapper.fromDto(manager)
      ),
      leaders: dto.leaders.map((leader) => ConfigInfoMapper.fromDto(leader)),
    };
  }
}

export class ConfigInfoMapper {
  public static fromDto(dto: IConfigInfoDto): IConfigInfo {
    const groupNameList = dto.groups.map((group) => group.name);
    return {
      ...dto,
      full_name: generateFullName(dto.last_name, dto.first_name),
      isRole: (role: ERoles | "manager" | "member") => {
        if (role === "manager") {
          return hasElementOfArray(groupNameList, MANAGER_ROLES_DTO);
        }
        if (role === "member") {
          return (
            groupNameList.includes(ERolesDto.Member) &&
            groupNameList.length === 1
          );
        }
        return groupNameList.includes(ROLE_MAP_TO_DTO[role]);
      },
      groups: dto.groups
        .map((group) => GroupMapper.fromDto(group))
        .filter((group) => group.name !== ERoles.Member),
    };
  }
  public static fromUser(user: IUser): IConfigInfo {
    return {
      ...user,
      isRole: (role: ERoles | "manager" | "member") => {
        if (role === "manager") {
          return false;
        }
        if (role === "member") {
          return true;
        }
        return false;
      },
      groups: [],
    };
  }
}

export class ConfigUserMapper {
  public static toDto(model: IConfigUserUpdate): IConfigUserUpdateDto {
    return {
      user_id: model.user_id,
      groups: model.groups.map((group) => ROLE_MAP_TO_ID[group]),
    };
  }
}
