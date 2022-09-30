import { FormatService, GeneratorService } from "@/utils";

import { IMemberCreateUpdateDto, IMemberDto } from "../dtos";
import { IMember, IMemberCreateUpdate } from "../models";
import { DepartmentMapper } from "./department.mapper";
import { GroupMapper } from "./group.mapper";

export class MemberMapper {
  public static fromDto(dto: IMemberDto): IMember {
    return {
      ...dto,
      gender: dto.gender === 1 ? "Nam" : "Nữ",
      dob: FormatService.toDate(dto.dob, "US"),
      last_modified_date: FormatService.toDate(dto.last_modified_date, "US"),
      department: DepartmentMapper.fromDto(dto.department),
      full_name: GeneratorService.generateFullName(
        dto.last_name,
        dto.first_name
      ),
      groups: GroupMapper.fromDto(dto.groups),
    };
  }

  public static toCreateDto(
    model: IMemberCreateUpdate
  ): IMemberCreateUpdateDto {
    return {
      ...model,
      dob: FormatService.toDate(model.dob, "API"),
      gender: model.gender === "Nam" ? 1 : 2,
      groups: GroupMapper.toDto(model.groups),
      department: DepartmentMapper.toDto(model.department),
    };
  }

  public static toUpdateDto(
    model: IMemberCreateUpdate
  ): IMemberCreateUpdateDto {
    return {
      ...model,
      dob: FormatService.toDate(model.dob, "API"),
      gender: model.gender === "Nam" ? 1 : 2,
      groups: GroupMapper.toDto(model.groups),
      department: DepartmentMapper.toDto(model.department),
    };
  }
}
