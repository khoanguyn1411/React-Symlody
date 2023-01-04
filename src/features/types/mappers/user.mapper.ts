import { StrictOmit } from "@/utils/types";

import { UserDto, UserShortDto } from "../dtos";
import {
  AuthAccount,
  Group,
  Member,
  Profile,
  Roles,
  RolesID,
  User,
  UserShort,
} from "../models";
import { authAccountMapper } from "./auth-account.mapper";
import { IMapperFromDto } from "./base-mappers/mapper";

export class UserMapper implements IMapperFromDto<UserDto, User> {
  public fromDto(dto: UserDto): User {
    const authAccount = authAccountMapper.fromDtoWithOutGroups(dto);
    return {
      ...authAccount,
      id: dto.id,
      departmentId: dto.department_id,
      avatarUrl: dto.avatar_url,
    };
  }

  public fromProfile(profile: Profile): User {
    return {
      ...authAccountMapper.fromInheritance(profile),
      id: profile.id,
      avatarUrl: profile.avatarUrl,
      departmentId: profile.department.id,
    };
  }

  public fromMember(model: Member): StrictOmit<User, "id"> {
    return {
      ...authAccountMapper.fromInheritance(model.authAccount),
      avatarUrl: model.avatarUrl,
      departmentId: model.department.id,
    };
  }
}

export class UserShortMapper
  implements IMapperFromDto<UserShortDto, UserShort>
{
  private readonly avatarUrl: UserShort["avatarUrl"];

  constructor(avatarUrl?: UserShort["avatarUrl"]) {
    this.avatarUrl = avatarUrl;
  }
  public fromDto(dto: UserShortDto): UserShort {
    const authAccount = authAccountMapper.fromDto(dto);
    return {
      ...authAccount,
      avatarUrl: dto.avatar_url ?? this.avatarUrl,
      id: dto.id,
    };
  }

  public fromUser(user: User): UserShort {
    const memberGroup: Group[] = [{ id: RolesID.Member, name: Roles.Member }];
    const authAccount = new AuthAccount({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      groups: memberGroup,
    });
    return {
      ...authAccount,
      id: user.id,
      avatarUrl: user.avatarUrl,
    };
  }
}

export const userMapper = new UserMapper();
export const userShortMapper = new UserShortMapper();
