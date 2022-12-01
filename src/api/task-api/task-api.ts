import { ITask, ITaskCreateUpdateDto, ITaskDto } from "@/features/types";
import { TTaskParamQueryDto } from "@/features/types/queries";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getTasks: () => `task/`,
  createTask: () => `task/`,
  updateTask: (id: ITask["id"]) => `task/${id}/`,
  deleteTask: (id: ITask["id"]) => `task/${id}/`,
};

export const TaskApi = {
  async getTasks(
    param?: TTaskParamQueryDto
  ): Promise<Types.RequestGetTasksResult> {
    const url = routes.getTasks();
    const method = http.get<ITaskDto[]>(url, param);
    return composeHttpMethodResult(method);
  },

  async deleteTask(id: ITask["id"]): Promise<Types.RequestDeleteTasksResult> {
    const url = routes.deleteTask(id);
    const method = http.delete<boolean>(url);
    return composeHttpMethodResult(method);
  },

  async createTask(
    body: ITaskCreateUpdateDto
  ): Promise<Types.RequestCreateTasksResult> {
    const url = routes.createTask();
    const method = http.post<ITaskDto>(url, body);
    return composeHttpMethodResult(method);
  },

  async updateTask(
    id: ITask["id"],
    body: ITaskCreateUpdateDto
  ): Promise<Types.RequestUpdateTasksResult> {
    const url = routes.updateTask(id);
    const method = http.patch<ITaskDto>(url, body);
    return composeHttpMethodResult(method);
  },
};
