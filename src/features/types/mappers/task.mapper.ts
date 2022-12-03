import { generateReverseRecord } from "@/utils/services/generate-service";

import {
  EPriorityDto,
  ETaskStatusDto,
  ITaskCreateUpdateDto,
  ITaskDto,
} from "../dtos";
import { ETodoStatusId, ITask, ITaskCreateUpdate } from "../models";
import { DateMapper } from "./base-mappers/date.mapper";
import { UserMapper } from "./user.mapper";

export const TASK_STATUS_TO_MODEL: Readonly<
  Record<ETaskStatusDto, ETodoStatusId>
> = {
  [ETaskStatusDto.Todo]: ETodoStatusId.Todo,
  [ETaskStatusDto.InProgress]: ETodoStatusId.InProgress,
  [ETaskStatusDto.Review]: ETodoStatusId.Review,
  [ETaskStatusDto.Done]: ETodoStatusId.Done,
};

export const TASK_STATUS_FROM_DTO: Readonly<
  Record<ETaskStatusDto, ETodoStatusId>
> = {
  [ETaskStatusDto.Todo]: ETodoStatusId.Todo,
  [ETaskStatusDto.InProgress]: ETodoStatusId.InProgress,
  [ETaskStatusDto.Review]: ETodoStatusId.Review,
  [ETaskStatusDto.Done]: ETodoStatusId.Done,
};

export const TASK_STATUS_TO_DTO = generateReverseRecord(TASK_STATUS_FROM_DTO);

export class TaskMapper {
  public static fromDto(dto: ITaskDto): ITask {
    return {
      ...dto,
      start_date: DateMapper.fromDto(dto.start_date),
      end_date: DateMapper.fromDto(dto.end_date),
      last_modified_date: DateMapper.fromDto(dto.last_modified_date),
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
      sent_email: model.sent_email,
      assignee: model.assignee,
      reporter: model.reporter,
      title: model.title,
      label: model.label,
      priority: model.isPriority ? EPriorityDto.High : EPriorityDto.Default,
      description: model.description,
      start_date: DateMapper.toDto(model.start_date),
      end_date: DateMapper.toDto(model.end_date),
      status: TASK_STATUS_TO_DTO[model.status],
    };
  }
}
