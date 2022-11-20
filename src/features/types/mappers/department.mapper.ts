import { IDepartmentCreateUpdateDto, IDepartmentDto } from "../dtos";
import { IDepartment, IDepartmentCreateUpdate } from "../models";

export class DepartmentMapper {
  public static fromDto(dto: IDepartmentDto): IDepartment {
    return { ...dto };
  }

  public static toDto(
    model: IDepartmentCreateUpdate
  ): IDepartmentCreateUpdateDto {
    return { ...model };
  }
}
