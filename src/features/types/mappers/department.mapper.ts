import { IDepartmentDto } from "../dtos";
import { IDepartment } from "../models";

export class DepartmentMapper {
  public static fromDto(dto: IDepartmentDto): IDepartment {
    return { ...dto };
  }

  public static toDto(model: IDepartment): IDepartmentDto {
    return { ...model };
  }
}
