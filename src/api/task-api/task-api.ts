import { ITaskCreateUpdateDto, ITaskDto } from "@/features/types";

import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getTasks: () => `task/`,
  createTask: () => `task/`,
};

export const TaskApi = {
  async getTasks(): Promise<Types.RequestGetTasksResult> {
    const url = routes.getTasks();
    const result = await Api.http.get<ITaskDto[]>(url);
    return returnResponse(result);
  },

  async createTask(
    body: ITaskCreateUpdateDto
  ): Promise<Types.RequestCreateTasksResult> {
    const url = routes.createTask();
    const result = await Api.http.post<ITaskDto>(url, body);
    return returnResponse(result);
  },
};
