import { EPriorityDto, ETaskStatusDto, ITaskDto } from "../dtos";
import { ETodoStatus, ETodoStatusId, ITask } from "../models";
import { UserMapper } from "./user.mapper";

export const TASK_STATUS_TO_MODEL: Readonly<
  Record<ETaskStatusDto, ETodoStatusId>
> = {
  [ETaskStatusDto.Todo]: ETodoStatusId.Todo,
  [ETaskStatusDto.InProgress]: ETodoStatusId.InProgress,
  [ETaskStatusDto.Review]: ETodoStatusId.Review,
  [ETaskStatusDto.Done]: ETodoStatusId.Done,
};

export const TODO_STATUS_MAP_FROM_ID: Readonly<
  Record<ETodoStatusId, ETodoStatus>
> = {
  [ETodoStatusId.Todo]: ETodoStatus.Todo,
  [ETodoStatusId.InProgress]: ETodoStatus.InProgress,
  [ETodoStatusId.Review]: ETodoStatus.Review,
  [ETodoStatusId.Done]: ETodoStatus.Done,
};

export class TaskMapper {
  public static fromDto(dto: ITaskDto): ITask {
    return {
      ...dto,
      isPriority: dto.priority === EPriorityDto.High,
      created_by: UserMapper.fromDto(dto.created_by),
      last_modified_by: UserMapper.fromDto(dto.last_modified_by),
      status: TASK_STATUS_TO_MODEL[dto.status],
    };
  }
}
