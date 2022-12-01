import { ITaskDto } from "@/features/types/dtos";

import { Response } from "../api-response";

export type RequestGetTasksResult = Response<ITaskDto[]>;
export type RequestCreateTasksResult = Response<ITaskDto>;
export type RequestUpdateTasksResult = Response<ITaskDto>;
export type RequestDeleteTasksResult = Response<boolean>;
