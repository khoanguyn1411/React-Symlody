import { TaskCreationDto, TaskDto } from "@/features/types/dtos";

import { Response } from "../api-response";

export namespace TaskApiResponse {
  export type Get = Response<TaskDto[]>;
  export type Create = Response<TaskDto>;
  export type Update = Response<TaskDto, TaskCreationDto>;
  export type Delete = Response<boolean>;
}
