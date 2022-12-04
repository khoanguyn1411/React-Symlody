import { extractErrorMessage } from "@/utils/services/error-handler-service";

import { HttpErrorDto } from "../dtos";
import {
  LeadersAndManagersDto,
  UserPermissionConfigCreationDto,
} from "../dtos/config-permission.dto";
import {
  HttpError,
  LeadersAndManagers,
  UserPermissionConfigCreation,
} from "../models";
import { ROLE_MAP_TO_ID } from "./group.mapper";
import { UserShortMapper } from "./user.mapper";

export class LeadersAndManagersMapper {
  public static fromDto(dto: LeadersAndManagersDto): LeadersAndManagers {
    return {
      managers: dto.managers.map((manager) => UserShortMapper.fromDto(manager)),
      leaders: dto.leaders.map((leader) => UserShortMapper.fromDto(leader)),
    };
  }
}

export class UserPermissionConfigMapper {
  public static toCreationDto(
    model: UserPermissionConfigCreation
  ): UserPermissionConfigCreationDto {
    return {
      user_id: model.user_id,
      groups: model.groups.map((group) => ROLE_MAP_TO_ID[group]),
    };
  }

  public static httpErrorFromDto(
    errorDto: HttpErrorDto<UserPermissionConfigCreationDto>
  ): HttpError<UserPermissionConfigCreation> {
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
