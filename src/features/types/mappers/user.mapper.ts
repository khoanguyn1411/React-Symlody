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
      first_name: profile.firstName,
      last_name: profile.lastName,
      full_name: generateFullName(profile.lastName, profile.firstName),
      department_id: profile.department.id,
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
      first_name: model.auth_account.firstName,
      last_name: model.auth_account.lastName,
      full_name: model.auth_account.fullName,
      email: model.auth_account.email,
      department_id: model.department.id,
    };
  }
}
