import { GlobalTypes } from "@/utils";

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
import { AuthAccountMapper } from "./auth-account.mapper";
import { IsRoleMapper } from "./base-mappers/is-role.mapper";

export class UserMapper {
  public static fromDto(dto: UserDto): User {
    return {
      ...AuthAccountMapper.fromDtoWithOutGroups(dto),
      id: dto.id,
      department_id: dto.department_id,
      avatar: dto.avatar,
    };
  }

  public static fromProfile(profile: Profile): User {
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

export class UserShortMapper {
  public static fromDto(dto: UserShortDto): UserShort {
    const authAccount = AuthAccountMapper.fromDto(dto);
    return {
      ...authAccount,
      isRole: IsRoleMapper.fromGroupModel(authAccount.groups),
      id: dto.id,
    };
  }

  public static fromUser(user: User): UserShort {
    const memberGroup: Group[] = [{ id: RolesID.Member, name: Roles.Member }];
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      fullName: user.fullName,
      email: user.email,
      groups: memberGroup,
      isRole: IsRoleMapper.fromGroupModel(memberGroup),
    };
  }
}
