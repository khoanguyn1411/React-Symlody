import { ITaskCreateUpdateDto, ITaskDto } from "@/features/types/dtos";

import { Response } from "../api-response";

export type RequestGetTasksResult = Response<ITaskDto[]>;
export type RequestCreateTasksResult = Response<ITaskDto>;
export type RequestUpdateTasksResult = Response<ITaskDto, ITaskCreateUpdateDto>;
export type RequestDeleteTasksResult = Response<boolean>;
