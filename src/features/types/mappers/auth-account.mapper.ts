import { ErrorHandler } from "@/utils/funcs/error-handler";
import { StrictOmit } from "@/utils/types";

import {
  AuthAccountCreationDto,
  AuthAccountDto,
  DetailErrorDto,
  GroupDto,
} from "../dtos";
import {
  AuthAccount,
  AuthAccountCreation,
  EntityValidationErrors,
} from "../models";
import { IMapperFromDto, IMapperToCreationDto } from "./base-mappers/mapper";
import { nameMapper } from "./base-mappers/name.mapper";
import { groupMapper } from "./group.mapper";

export class AuthAccountMapper
  implements
    IMapperFromDto<AuthAccountDto, AuthAccount>,
    IMapperToCreationDto<AuthAccountCreationDto, AuthAccount>
{
  public fromDto(dto: AuthAccountDto): AuthAccount {
    return {
      ...nameMapper.fromDto(dto),
      email: dto.email,
      groups: dto.groups.map((item: GroupDto) => groupMapper.fromDto(item)),
    };
  }

  public fromInheritance<T extends AuthAccount>(
    model: T
  ): StrictOmit<AuthAccount, "groups"> {
    return {
      email: model.email,
      firstName: model.firstName,
      lastName: model.lastName,
      fullName: model.fullName,
    };
  }

  public fromDtoWithOutGroups(
    dto: StrictOmit<AuthAccountDto, "groups">
  ): StrictOmit<AuthAccount, "groups"> {
    return {
      email: dto.email,
      ...nameMapper.fromDto(dto),
    };
  }

  public toCreationDto(model: AuthAccountCreation): AuthAccountCreationDto {
    return {
      email: model.email,
      first_name: model.firstName,
      last_name: model.lastName,
    };
  }

  public validationHttpDetailErrorFromDto(
    errorDto: DetailErrorDto<AuthAccountCreationDto>
  ): EntityValidationErrors<AuthAccountCreation> {
    const { email, last_name, first_name } = errorDto;
    return {
      email: ErrorHandler.extractErrorMessage(email),
      lastName: ErrorHandler.extractErrorMessage(last_name),
      firstName: ErrorHandler.extractErrorMessage(first_name),
    };
  }
}

export const authAccountMapper = new AuthAccountMapper();
