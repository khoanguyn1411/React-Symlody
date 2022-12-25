import { ErrorHandler } from "@/utils/funcs/error-handler";
import { reverseRecord } from "@/utils/funcs/reverse-record";

import { HttpErrorDto, TaskCreationDto, TaskDto } from "../dtos";
import { HttpError, Task, TaskCreation } from "../models";
import { dateMapper } from "./base-mappers/date.mapper";
import {
  IMapperFromDto,
  IMapperToCreationDto,
  IMapperToHttpError,
} from "./base-mappers/mapper";
import { userMapper } from "./user.mapper";

export const TASK_STATUS_FROM_DTO: Readonly<
  Record<TaskDto.StatusIdsDto, Task.StatusIds>
> = {
  [TaskDto.StatusIdsDto.Todo]: Task.StatusIds.Todo,
  [TaskDto.StatusIdsDto.InProgress]: Task.StatusIds.InProgress,
  [TaskDto.StatusIdsDto.Review]: Task.StatusIds.Review,
  [TaskDto.StatusIdsDto.Done]: Task.StatusIds.Done,
};

export const TASK_STATUS_TO_DTO = reverseRecord(TASK_STATUS_FROM_DTO);

export const TASK_STATUS_FROM_ID_TO_READABLE: Readonly<
  Record<Task.StatusIds, Task.ReadableStatuses>
> = {
  [Task.StatusIds.Todo]: Task.ReadableStatuses.Todo,
  [Task.StatusIds.InProgress]: Task.ReadableStatuses.InProgress,
  [Task.StatusIds.Review]: Task.ReadableStatuses.Review,
  [Task.StatusIds.Done]: Task.ReadableStatuses.Done,
};

export class TaskMapper
  implements
    IMapperFromDto<TaskDto, Task>,
    IMapperToCreationDto<TaskCreationDto, TaskCreation>,
    IMapperToHttpError<TaskCreationDto, TaskCreation>
{
  public httpErrorFromDto(
    errorDto: HttpErrorDto<TaskCreationDto>
  ): HttpError<TaskCreation> {
    return {
      title: ErrorHandler.extractErrorMessage(errorDto.title),
      assignee: {
        id: ErrorHandler.extractErrorMessage(errorDto.assignee.id),
      },
      reporter: { id: ErrorHandler.extractErrorMessage(errorDto.reporter.id) },
      isSentEmail: ErrorHandler.extractErrorMessage(errorDto.sent_email),
      label: ErrorHandler.extractErrorMessage(errorDto.label),
      isPriority: ErrorHandler.extractErrorMessage(errorDto.priority),
      description: ErrorHandler.extractErrorMessage(errorDto.description),
      startDate: ErrorHandler.extractErrorMessage(errorDto.start_date),
      endDate: ErrorHandler.extractErrorMessage(errorDto.end_date),
      status: ErrorHandler.extractErrorMessage(errorDto.status),
      nonFieldErrors: ErrorHandler.extractErrorMessage(
        errorDto.non_field_errors
      ),
    };
  }
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
      isPriority: dto.priority === TaskDto.PriorityDto.High,
      createdBy: userMapper.fromDto(dto.created_by),
      lastModifiedBy: dto.last_modified_by
        ? userMapper.fromDto(dto.last_modified_by)
        : null,
      status: TASK_STATUS_FROM_DTO[dto.status],
    };
  }

  public toCreationDto(model: TaskCreation): TaskCreationDto {
    return {
      sent_email: model.isSentEmail,
      assignee: model.assignee,
      reporter: model.reporter,
      title: model.title,
      label: model.label,
      priority: model.isPriority
        ? TaskDto.PriorityDto.High
        : TaskDto.PriorityDto.Default,
      description: model.description,
      start_date: dateMapper.toDto(model.startDate),
      end_date: dateMapper.toDto(model.endDate),
      status: TASK_STATUS_TO_DTO[model.status],
    };
  }
}

export const taskMapper = new TaskMapper();
