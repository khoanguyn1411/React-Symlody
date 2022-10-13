import { GeneratorService } from "@/utils";

import { IUserDto } from "../dtos";
import { IMember, IUser } from "../models";

export class UserMapper {
  public static fromDto(dto: IUserDto): IUser {
    return {
      ...dto,
      full_name: GeneratorService.generateFullName(
        dto.last_name,
        dto.first_name
      ),
    };
  }

  public static toDto(model: IUser): IUserDto {
    return { ...model };
  }

  public static fromMemberModel(model: IMember): IUser {
    return {
      avatar: model.avatar,
      id: model.id,
      first_name: model.auth_account.first_name,
      last_name: model.auth_account.last_name,
      full_name: model.auth_account.full_name,
      email: model.auth_account.email,
    };
  }
}
