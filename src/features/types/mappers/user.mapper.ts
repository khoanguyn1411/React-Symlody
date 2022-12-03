import { GlobalTypes } from "@/utils";

import { UserDto } from "../dtos";
import { IProfile, Member, User } from "../models";
import { AuthAccountMapper } from "./auth-account.mapper";

export class UserMapper {
  public static fromDto(dto: UserDto): User {
    return {
      ...AuthAccountMapper.fromDtoWithOutGroups(dto),
      id: dto.id,
      department_id: dto.department_id,
      avatar: dto.avatar,
    };
  }

  public static fromProfile(profile: IProfile): User {
    return {
      ...AuthAccountMapper.fromInheritance(profile),
      id: profile.id,
      avatar: profile.avatar,
      department_id: profile.department.id,
    };
  }

  public static fromMember(model: Member): GlobalTypes.StrictOmit<User, "id"> {
    return {
      ...AuthAccountMapper.fromInheritance(model.authAccount),
      avatar: model.avatar,
      department_id: model.department.id,
    };
  }
}
