import { IProfileDto } from "../dtos";
import { ERoles, IProfile } from "../models";
import { DepartmentMapper } from "./department.mapper";
import { GroupMapper, ROLE_MAP_FROM_DTO } from "./group.mapper";

export class ProfileMapper {
  public static fromDto(dto: IProfileDto): IProfile {
    const groups = dto.groups.map((group) => GroupMapper.fromDto(group));
    return {
      ...dto,
      gender: dto.gender === 1 ? "Nam" : "Nữ",
      department: DepartmentMapper.fromDto(dto.department),
      groups,
      isRole: (role: ERoles) =>
        groups.map((group) => group.name).includes(ROLE_MAP_FROM_DTO[role]),
    };
  }
}
