import { GeneratorService } from "@/utils";

import {
  ERolesDto,
  IAuthAccountCreateUpdateDto,
  IAuthAccountDto,
  IGroupDto,
} from "../dtos";
import { IAuthAccount } from "../models";
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

  public static toDto(model: IAuthAccount): IAuthAccountCreateUpdateDto {
    let groupMapped = model.groups.map((item) => GroupMapper.toDto(item));
    const groupMappedName = groupMapped.map((item) => item.name as ERolesDto);
    if (!groupMappedName.includes(ERolesDto.Member)) {
      groupMapped = [...groupMapped, { name: ERolesDto.Member }];
    }
    return {
      ...model,
    };
  }
}
