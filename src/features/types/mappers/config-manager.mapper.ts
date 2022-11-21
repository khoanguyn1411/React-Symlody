import { generateFullName } from "@/utils/services/generate-service";

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
    return {
      ...dto,
      full_name: generateFullName(dto.last_name, dto.first_name),
      isRole: (role: ERoles) =>
        dto.groups.map((group) => group.name).includes(ROLE_MAP_TO_DTO[role]),
      groups: dto.groups
        .map((group) => GroupMapper.fromDto(group))
        .filter((group) => group.name !== ERoles.Member),
    };
  }
  public static fromUser(user: IUser): IConfigInfo {
    return {
      ...user,
      isRole: () => false,
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
