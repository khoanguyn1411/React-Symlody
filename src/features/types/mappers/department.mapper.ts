import { DepartmentCreationDto, DepartmentDto } from "../dtos";
import { Department, DepartmentCreation } from "../models";
import { DateMapper } from "./base-mappers/date.mapper";

export class DepartmentMapper {
  public static fromDto(dto: DepartmentDto): Department {
    return {
      id: dto.id,
      name: dto.name,
      abbreviationName: dto.abbreviation_name,
      memberCount: dto.member_count,
      createdDate: DateMapper.fromDto(dto.created_date),
    };
  }

  public static toCreationDto(
    model: DepartmentCreation
  ): DepartmentCreationDto {
    return {
      name: model.name,
      abbreviation_name: model.abbreviationName,
    };
  }
}
