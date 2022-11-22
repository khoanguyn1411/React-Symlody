import { GeneratorService, GlobalTypes } from "@/utils";
import { generateFullName } from "@/utils/services/generate-service";

import { IUserDto } from "../dtos";
import { IMember, IProfile, IUser } from "../models";

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

  public static fromProfile(profile: IProfile): IUser {
    return {
      id: profile.id,
      avatar: profile.avatar,
      first_name: profile.first_name,
      last_name: profile.last_name,
      full_name: generateFullName(profile.last_name, profile.first_name),
      email: profile.email,
    };
  }

  public static toDto(model: IUser): IUserDto {
    return { ...model };
  }

  public static fromMemberModel(
    model: IMember
  ): GlobalTypes.StrictOmit<IUser, "id"> {
    return {
      avatar: model.avatar,
      first_name: model.auth_account.first_name,
      last_name: model.auth_account.last_name,
      full_name: model.auth_account.full_name,
      email: model.auth_account.email,
    };
  }
}
