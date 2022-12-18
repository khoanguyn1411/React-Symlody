import { StrictOmit } from "@/utils/types";

import { UserDto, UserShortDto } from "../dtos";
import {
  Group,
  Member,
  Profile,
  Roles,
  RolesID,
  User,
  UserShort,
} from "../models";
import { authAccountMapper } from "./auth-account.mapper";
import { isRoleMapper } from "./base-mappers/is-role.mapper";
import { IMapperFromDto } from "./base-mappers/mapper";

export class UserMapper implements IMapperFromDto<UserDto, User> {
  public fromDto(dto: UserDto): User {
    return {
      ...authAccountMapper.fromDtoWithOutGroups(dto),
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
  public fromDto(dto: UserShortDto): UserShort {
    const authAccount = authAccountMapper.fromDto(dto);
    return {
      ...authAccount,
      avatarUrl: dto.avatar_url,
      isRole: isRoleMapper.fromGroupModel(authAccount.groups),
      id: dto.id,
    };
  }

  public fromUser(user: User): UserShort {
    const memberGroup: Group[] = [{ id: RolesID.Member, name: Roles.Member }];
    return {
      id: user.id,
      avatarUrl: user.avatarUrl,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      email: user.email,
      groups: memberGroup,
      isRole: isRoleMapper.fromGroupModel(memberGroup),
    };
  }
}

export const userMapper = new UserMapper();
export const userShortMapper = new UserShortMapper();
