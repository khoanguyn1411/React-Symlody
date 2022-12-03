import { GeneratorService } from "@/utils";
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
import { GroupMapper } from "./group.mapper";

export class AuthAccountMapper {
  public static fromDto(dto: AuthAccountDto): AuthAccount {
    return {
      email: dto.email,
      firstName: dto.first_name,
      lastName: dto.last_name,
      fullName: GeneratorService.generateFullName(
        dto.last_name,
        dto.first_name
      ),
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
      firstName: dto.first_name,
      lastName: dto.last_name,
      fullName: GeneratorService.generateFullName(
        dto.last_name,
        dto.first_name
      ),
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
