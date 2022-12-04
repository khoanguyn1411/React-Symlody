import { generateReverseRecord } from "@/utils/services/generate-service";

import { PriorityDto, TaskCreationDto, TaskDto, TaskStatusDto } from "../dtos";
import { Task, TaskCreation, TodoStatusId } from "../models";
import { DateMapper } from "./base-mappers/date.mapper";
import { UserMapper } from "./user.mapper";

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

export const TASK_STATUS_TO_DTO = generateReverseRecord(TASK_STATUS_FROM_DTO);

export class TaskMapper {
  public static fromDto(dto: TaskDto): Task {
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
      startDate: DateMapper.fromDto(dto.start_date),
      endDate: DateMapper.fromDto(dto.end_date),
      lastModifiedDate: DateMapper.fromDto(dto.last_modified_date),
      isPriority: dto.priority === PriorityDto.High,
      createdBy: UserMapper.fromDto(dto.created_by),
      lastModifiedBy: dto.last_modified_by
        ? UserMapper.fromDto(dto.last_modified_by)
        : null,
      status: TASK_STATUS_TO_MODEL[dto.status],
    };
  }

  public static toDto(model: TaskCreation): TaskCreationDto {
    return {
      sent_email: model.isSentEmail,
      assignee: model.assignee,
      reporter: model.reporter,
      title: model.title,
      label: model.label,
      priority: model.isPriority ? PriorityDto.High : PriorityDto.Default,
      description: model.description,
      start_date: DateMapper.toDto(model.startDate),
      end_date: DateMapper.toDto(model.endDate),
      status: TASK_STATUS_TO_DTO[model.status],
    };
  }
}
