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
import {
  IMapperFromDto,
  IMapperToCreationDto,
  IMapperToHttpError,
} from "./base-mappers/mapper";
import { ROLE_MAP_TO_ID } from "./group.mapper";
import { userShortMapper } from "./user.mapper";

export class LeadersAndManagersMapper
  implements IMapperFromDto<LeadersAndManagersDto, LeadersAndManagers>
{
  public fromDto(dto: LeadersAndManagersDto): LeadersAndManagers {
    return {
      managers: dto.managers.map((manager) => userShortMapper.fromDto(manager)),
      leaders: dto.leaders.map((leader) => userShortMapper.fromDto(leader)),
    };
  }
}

export const leadersAndManagersMapper = new LeadersAndManagersMapper();

export class UserPermissionConfigMapper
  implements
    IMapperToCreationDto<
      UserPermissionConfigCreationDto,
      UserPermissionConfigCreation
    >,
    IMapperToHttpError<
      UserPermissionConfigCreationDto,
      UserPermissionConfigCreation
    >
{
  public toCreationDto(
    model: UserPermissionConfigCreation
  ): UserPermissionConfigCreationDto {
    return {
      user_id: model.userId,
      groups: model.groups.map((group) => ROLE_MAP_TO_ID[group]),
    };
  }

  public httpErrorFromDto(
    errorDto: HttpErrorDto<UserPermissionConfigCreationDto>
  ): HttpError<UserPermissionConfigCreation> {
    const { user_id, groups } = errorDto.details;
    return {
      error: errorDto.error,
      detail: {
        userId: extractErrorMessage(user_id),
        groups: extractErrorMessage(groups),
      },
    };
  }
}

export const userPermissionConfigMapper = new UserPermissionConfigMapper();
