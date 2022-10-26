import { FormatService } from "@/utils";
import { generateReverseDto } from "@/utils/services/generate-service";

import {
  EPriorityDto,
  ETaskStatusDto,
  ITaskCreateUpdateDto,
  ITaskDto,
} from "../dtos";
import { ETodoStatusId, ITask, ITaskCreateUpdate } from "../models";
import { UserMapper } from "./user.mapper";

export const TASK_STATUS_TO_MODEL: Readonly<
  Record<ETaskStatusDto, ETodoStatusId>
> = {
  [ETaskStatusDto.Todo]: ETodoStatusId.Todo,
  [ETaskStatusDto.InProgress]: ETodoStatusId.InProgress,
  [ETaskStatusDto.Review]: ETodoStatusId.Review,
  [ETaskStatusDto.Done]: ETodoStatusId.Done,
};

export const TASK_STATUS_TO_DTO: Readonly<
  Record<ETaskStatusDto, ETodoStatusId>
> = {
  [ETaskStatusDto.Todo]: ETodoStatusId.Todo,
  [ETaskStatusDto.InProgress]: ETodoStatusId.InProgress,
  [ETaskStatusDto.Review]: ETodoStatusId.Review,
  [ETaskStatusDto.Done]: ETodoStatusId.Done,
};

export const TODO_STATUS_MAP_FROM_ID = generateReverseDto(TASK_STATUS_TO_DTO);

export class TaskMapper {
  public static fromDto(dto: ITaskDto): ITask {
    return {
      ...dto,
      start_date: dto.start_date
        ? FormatService.toDate(dto.start_date, "US")
        : "",
      end_date: dto.end_date ? FormatService.toDate(dto.end_date, "US") : "",
      last_modified_date: dto.last_modified_date
        ? FormatService.toDate(dto.last_modified_date, "US")
        : "",
      isPriority: dto.priority === EPriorityDto.High,
      created_by: UserMapper.fromDto(dto.created_by),
      last_modified_by: dto.last_modified_by
        ? UserMapper.fromDto(dto.last_modified_by)
        : null,
      status: TASK_STATUS_TO_MODEL[dto.status],
    };
  }

  public static toDto(model: ITaskCreateUpdate): ITaskCreateUpdateDto {
    return {
      ...model,
      start_date: FormatService.toDate(model.start_date, "API"),
      end_date: FormatService.toDate(model.end_date, "API"),
      status: TASK_STATUS_TO_DTO[model.status],
    };
  }
}
