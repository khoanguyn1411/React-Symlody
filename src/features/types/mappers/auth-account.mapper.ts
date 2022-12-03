import { extractErrorMessage } from "@/utils/services/error-handler-service";
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
import { NameMapper } from "./base-mappers/name.mapper";
import { GroupMapper } from "./group.mapper";

export class AuthAccountMapper {
  public static fromDto(dto: AuthAccountDto): AuthAccount {
    return {
      ...NameMapper.fromDto(dto),
      email: dto.email,
      groups: dto.groups.map((item: GroupDto) => GroupMapper.fromDto(item)),
    };
  }

  public static fromInheritance<T extends AuthAccount>(
    model: T
  ): StrictOmit<AuthAccount, "groups"> {
    return {
      email: model.email,
      firstName: model.firstName,
      lastName: model.lastName,
      fullName: model.fullName,
    };
  }

  public static fromDtoWithOutGroups(
    dto: StrictOmit<AuthAccountDto, "groups">
  ): StrictOmit<AuthAccount, "groups"> {
    return {
      email: dto.email,
      ...NameMapper.fromDto(dto),
    };
  }

  public static toCreationDto(
    model: AuthAccountCreation
  ): AuthAccountCreationDto {
    return {
      email: model.email,
      first_name: model.firstName,
      last_name: model.lastName,
    };
  }

  public static validationHttpDetailErrorFromDto(
    errorDto: DetailErrorDto<AuthAccountCreationDto>
  ): EntityValidationErrors<AuthAccountCreation> {
    const { email, last_name, first_name } = errorDto;
    return {
      email: extractErrorMessage(email),
      lastName: extractErrorMessage(last_name),
      firstName: extractErrorMessage(first_name),
    };
  }
}
