import { TaskFilterParamsDto } from "../../dtos/filter-params/task-filter-params.dto";
import { TaskFilterParams } from "../../models/filter-params/task-filter-params";

export class TaskFilterParamsMapper {
  public static toDto(data: TaskFilterParams): TaskFilterParamsDto {
    return {
      department_id: data.departmentId,
    };
  }
}
