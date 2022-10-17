import { ITaskDto } from "@/features/types/dtos";

import { Response } from "../types";

export type RequestGetTasksResult = Response<ITaskDto[]>;
