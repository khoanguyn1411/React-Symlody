import { ITask, ITaskCreateUpdateDto, ITaskDto } from "@/features/types";
import { TTaskParamQueryDto } from "@/features/types/queries";

import { http } from "../api-core";
import { returnResponse } from "../api-utilities";
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
    const result = await http.get<ITaskDto[]>(url, param);
    return returnResponse(result);
  },

  async deleteTask(id: ITask["id"]): Promise<Types.RequestDeleteTasksResult> {
    const url = routes.deleteTask(id);
    const result = await http.delete<boolean>(url);
    return returnResponse(result);
  },

  async createTask(
    body: ITaskCreateUpdateDto
  ): Promise<Types.RequestCreateTasksResult> {
    const url = routes.createTask();
    const result = await http.post<ITaskDto>(url, body);
    return returnResponse(result);
  },

  async updateTask(
    id: ITask["id"],
    body: ITaskCreateUpdateDto
  ): Promise<Types.RequestUpdateTasksResult> {
    const url = routes.updateTask(id);
    const result = await http.patch<ITaskDto>(url, body);
    return returnResponse(result);
  },
};
