import { TaskFilterParamsDto } from "../../dtos/filter-params/task-filter-params.dto";
import { TaskFilterParams } from "../../models/filter-params/task-filter-params";
import { IMapperToDto } from "../base-mappers/mapper";

export class TaskFilterParamsMapper
  implements IMapperToDto<TaskFilterParamsDto, TaskFilterParams>
{
  public toDto(data: TaskFilterParams): TaskFilterParamsDto {
    return {
      department_id: data.departmentId,
    };
  }
}
export const taskFilterParamsMapper = new TaskFilterParamsMapper();
