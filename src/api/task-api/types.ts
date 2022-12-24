import {
  AppResponseDto,
  TaskCreationDto,
  TaskDto,
} from "@/features/types/dtos";

export namespace TaskApiResponse {
  export type Get = AppResponseDto<TaskDto[]>;
  export type Create = AppResponseDto<TaskDto>;
  export type Update = AppResponseDto<TaskDto, TaskCreationDto>;
  export type Delete = AppResponseDto<boolean>;
}
