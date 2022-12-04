import { TaskCreationDto, TaskDto } from "@/features/types/dtos";

import { Response } from "../api-response";

export type RequestGetTasksResult = Response<TaskDto[]>;
export type RequestCreateTasksResult = Response<TaskDto>;
export type RequestUpdateTasksResult = Response<TaskDto, TaskCreationDto>;
export type RequestDeleteTasksResult = Response<boolean>;
