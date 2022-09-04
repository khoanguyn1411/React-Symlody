import { IAuthAccountDto } from "../dtos";
import { IAuthAccount } from "../models";
import { GroupMapper } from "./group.mapper";

export class AuthAccountMapper {
  public static fromDto(dto: IAuthAccountDto): IAuthAccount {
    return {
      ...dto,
      groups: GroupMapper.fromDto(dto.groups),
    };
  }
  public static toDto(model: IAuthAccount): IAuthAccountDto {
    return {
      ...model,
      groups: GroupMapper.toDto(model.groups),
    };
  }
}