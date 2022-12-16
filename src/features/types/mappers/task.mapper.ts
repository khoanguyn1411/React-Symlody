import { reverseRecord } from "@/utils/funcs/reverse-record";

import { PriorityDto, TaskCreationDto, TaskDto, TaskStatusDto } from "../dtos";
import { Task, TaskCreation, TodoStatusId } from "../models";
import { dateMapper } from "./base-mappers/date.mapper";
import { IMapperFromDto, IMapperToCreationDto } from "./base-mappers/mapper";
import { userMapper } from "./user.mapper";

export const TASK_STATUS_TO_MODEL: Readonly<
  Record<TaskStatusDto, TodoStatusId>
> = {
  [TaskStatusDto.Todo]: TodoStatusId.Todo,
  [TaskStatusDto.InProgress]: TodoStatusId.InProgress,
  [TaskStatusDto.Review]: TodoStatusId.Review,
  [TaskStatusDto.Done]: TodoStatusId.Done,
};

export const TASK_STATUS_FROM_DTO: Readonly<
  Record<TaskStatusDto, TodoStatusId>
> = {
  [TaskStatusDto.Todo]: TodoStatusId.Todo,
  [TaskStatusDto.InProgress]: TodoStatusId.InProgress,
  [TaskStatusDto.Review]: TodoStatusId.Review,
  [TaskStatusDto.Done]: TodoStatusId.Done,
};

export const TASK_STATUS_TO_DTO = reverseRecord(TASK_STATUS_FROM_DTO);

export class TaskMapper
  implements
    IMapperFromDto<TaskDto, Task>,
    IMapperToCreationDto<TaskCreationDto, TaskCreation>
{
  public fromDto(dto: TaskDto): Task {
    return {
      id: dto.id,
      assignee: {
        id: dto.assignee.id,
      },
      reporter: {
        id: dto.reporter.id,
      },
      title: dto.title,
      description: dto.description,
      label: dto.label,
      estimation: dto.estimation,
      isSentEmail: dto.sent_email,
      startDate: dateMapper.fromDto(dto.start_date),
      endDate: dateMapper.fromDto(dto.end_date),
      lastModifiedDate: dateMapper.fromDto(dto.last_modified_date),
      isPriority: dto.priority === PriorityDto.High,
      createdBy: userMapper.fromDto(dto.created_by),
      lastModifiedBy: dto.last_modified_by
        ? userMapper.fromDto(dto.last_modified_by)
        : null,
      status: TASK_STATUS_TO_MODEL[dto.status],
    };
  }

  public toCreationDto(model: TaskCreation): TaskCreationDto {
    return {
      sent_email: model.isSentEmail,
      assignee: model.assignee,
      reporter: model.reporter,
      title: model.title,
      label: model.label,
      priority: model.isPriority ? PriorityDto.High : PriorityDto.Default,
      description: model.description,
      start_date: dateMapper.toDto(model.startDate),
      end_date: dateMapper.toDto(model.endDate),
      status: TASK_STATUS_TO_DTO[model.status],
    };
  }
}

export const taskMapper = new TaskMapper();
