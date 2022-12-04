import { Task, TaskCreationDto, TaskDto } from "@/features/types";
import { TaskFilterParamsDto } from "@/features/types/dtos/filter-params";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getTasks: () => `task/`,
  createTask: () => `task/`,
  updateTask: (id: Task["id"]) => `task/${id}/`,
  deleteTask: (id: Task["id"]) => `task/${id}/`,
};

export const TaskApi = {
  async getTasks(
    param: TaskFilterParamsDto
  ): Promise<Types.RequestGetTasksResult> {
    const url = routes.getTasks();
    const method = http.get<TaskDto[]>(url, param);
    return composeHttpMethodResult(method);
  },

  async deleteTask(id: Task["id"]): Promise<Types.RequestDeleteTasksResult> {
    const url = routes.deleteTask(id);
    const method = http.delete<boolean>(url);
    return composeHttpMethodResult(method);
  },

  async createTask(
    body: TaskCreationDto
  ): Promise<Types.RequestCreateTasksResult> {
    const url = routes.createTask();
    const method = http.post<TaskDto>(url, body);
    return composeHttpMethodResult(method);
  },

  async updateTask(
    id: Task["id"],
    body: TaskCreationDto
  ): Promise<Types.RequestUpdateTasksResult> {
    const url = routes.updateTask(id);
    const method = http.patch<TaskDto>(url, body);
    return composeHttpMethodResult(method);
  },
};
