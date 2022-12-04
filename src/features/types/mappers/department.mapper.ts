import { DepartmentCreationDto, DepartmentDto } from "../dtos";
import { Department, DepartmentCreation } from "../models";
import { dateMapper } from "./base-mappers/date.mapper";
import { IMapperFromDto, IMapperToCreationDto } from "./base-mappers/mapper";

export class DepartmentMapper
  implements
    IMapperFromDto<DepartmentDto, Department>,
    IMapperToCreationDto<DepartmentCreationDto, DepartmentCreation>
{
  public fromDto(dto: DepartmentDto): Department {
    return {
      id: dto.id,
      name: dto.name,
      abbreviationName: dto.abbreviation_name,
      memberCount: dto.member_count,
      createdDate: dateMapper.fromDto(dto.created_date),
    };
  }

  public toCreationDto(model: DepartmentCreation): DepartmentCreationDto {
    return {
      name: model.name,
      abbreviation_name: model.abbreviationName,
    };
  }
}

export const departmentMapper = new DepartmentMapper();
