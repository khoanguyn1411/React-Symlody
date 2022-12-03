import { hasElementOfArray } from "@/utils/services/common-service";
import { extractErrorMessage } from "@/utils/services/error-handler-service";

import { HttpErrorDto } from "../dtos";
import {
  IConfigInfoDto,
  IConfigManagerDto,
  IConfigUserUpdateDto,
} from "../dtos/config-manager.dto";
import {
  ERoles,
  HttpError,
  IConfigInfo,
  IConfigManager,
  IConfigUserUpdate,
  IUser,
} from "../models";
import { AuthAccountMapper } from "./auth-account.mapper";
import { ROLE_MAP_TO_ID } from "./group.mapper";

export const MANAGER_ROLES = [
  ERoles.EventManager,
  ERoles.MemberManager,
  ERoles.NotificationManager,
  ERoles.PropertyManager,
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
    const authAccountModel = AuthAccountMapper.fromDto({
      first_name: dto.first_name,
      last_name: dto.last_name,
      email: dto.email,
      groups: dto.groups,
    });
    const groupNameList = authAccountModel.groups.map((group) => group.name);
    return {
      ...dto,
      ...authAccountModel,
      isRole: (role: ERoles | "manager" | "member") => {
        if (role === "manager") {
          return hasElementOfArray(groupNameList, MANAGER_ROLES);
        }
        if (role === "member") {
          return (
            groupNameList.includes(ERoles.Member) && groupNameList.length === 1
          );
        }
        return groupNameList.includes(role);
      },
    };
  }
  public static fromUser(user: IUser): IConfigInfo {
    return {
      id: user.id,
      firstName: user.first_name,
      lastName: user.last_name,
      fullName: user.full_name,
      email: user.email,
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

  public static httpErrorFromDto(
    errorDto: HttpErrorDto<IConfigUserUpdateDto>
  ): HttpError<IConfigUserUpdate> {
    const { user_id, groups } = errorDto.details;
    return {
      error: errorDto.error,
      detail: {
        user_id: extractErrorMessage(user_id),
        groups: extractErrorMessage(groups),
      },
    };
  }
}
