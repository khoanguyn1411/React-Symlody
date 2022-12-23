import { Task, TaskCreationDto, TaskDto } from "@/features/types";
import { TaskFilterParamsDto } from "@/features/types/dtos/filter-params";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const BASE_URL = "task";
const taskUrls = new ComposeUrlService(BASE_URL);

const apiModuleUrls = taskUrls.composeCommonAPIMethodUrls();

export const TaskApi = {
  async getTasks(
    param: TaskFilterParamsDto
  ): Promise<Types.RequestGetTasksResult> {
    const url = apiModuleUrls.getAndCreate;
    const method = http.get<TaskDto[]>(url, param);
    return composeHttpMethodResult(method);
  },

  async deleteTask(id: Task["id"]): Promise<Types.RequestDeleteTasksResult> {
    const url = apiModuleUrls.updateAndDeleteWithId(id);
    const method = http.delete<boolean>(url);
    return composeHttpMethodResult(method);
  },

  async createTask(
    body: TaskCreationDto
  ): Promise<Types.RequestCreateTasksResult> {
    const url = apiModuleUrls.getAndCreate;
    const method = http.post<TaskDto>(url, body);
    return composeHttpMethodResult(method);
  },

  async updateTask(
    id: Task["id"],
    body: TaskCreationDto
  ): Promise<Types.RequestUpdateTasksResult> {
    const url = apiModuleUrls.updateAndDeleteWithId(id);
    const method = http.patch<TaskDto>(url, body);
    return composeHttpMethodResult(method);
  },
};
