import { GeneratorService } from "@/utils";

import {
  IAuthAccountCreateUpdateDto,
  IAuthAccountDto,
  IGroupDto,
} from "../dtos";
import { IAuthAccount, IAuthAccountCreateUpdate } from "../models";
import { GroupMapper } from "./group.mapper";

export class AuthAccountMapper {
  public static fromDto(dto: IAuthAccountDto): IAuthAccount {
    return {
      ...dto,
      full_name: GeneratorService.generateFullName(
        dto.last_name,
        dto.first_name
      ),
      groups: dto.groups.map((item: IGroupDto) => GroupMapper.fromDto(item)),
    };
  }

  public static toDto(
    model: IAuthAccountCreateUpdate
  ): IAuthAccountCreateUpdateDto {
    return {
      email: model.email,
      first_name: model.first_name,
      last_name: model.last_name,
    };
  }
}
