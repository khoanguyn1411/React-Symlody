import { GeneratorService } from "@/utils";

import { ERolesDto, IAuthAccountDto } from "../dtos";
import { IAuthAccount, IGroup } from "../models";
import { GroupMapper } from "./group.mapper";

export class AuthAccountMapper {
  public static fromDto(dto: IAuthAccountDto): IAuthAccount {
    return {
      ...dto,
      full_name: GeneratorService.generateFullName(
        dto.last_name,
        dto.first_name
      ),
      groups: dto.groups.map((item: IGroup) => GroupMapper.fromDto(item)),
    };
  }

  public static toDto(model: IAuthAccount): IAuthAccountDto {
    let groupMapped = model.groups.map((item) => GroupMapper.toDto(item));
    const groupMappedName = groupMapped.map((item) => item.name as ERolesDto);
    if (!groupMappedName.includes(ERolesDto.Member)) {
      groupMapped = [...groupMapped, { name: ERolesDto.Member }];
    }
    return {
      ...model,
      groups: groupMapped,
    };
  }
}
