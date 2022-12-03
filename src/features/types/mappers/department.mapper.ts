import { DepartmentDto, IDepartmentCreateUpdateDto } from "../dtos";
import { Department, IDepartmentCreateUpdate } from "../models";

export class DepartmentMapper {
  public static fromDto(dto: DepartmentDto): Department {
    return { ...dto };
  }

  public static toDto(
    model: IDepartmentCreateUpdate
  ): IDepartmentCreateUpdateDto {
    return { ...model };
  }
}
