import { ITaskDto } from "@/features/types/dtos";

import { Response } from "../types";

export type RequestGetTasksResult = Response<ITaskDto[]>;
export type RequestCreateTasksResult = Response<ITaskDto>;
export type RequestUpdateTasksResult = Response<ITaskDto>;
