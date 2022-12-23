import { Task, TaskCreationDto, TaskDto } from "@/features/types";
import { TaskFilterParamsDto } from "@/features/types/dtos/filter-params";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import { TaskApiResponse } from ".";

const BASE_URL = "task";
const taskUrlService = new ComposeUrlService(BASE_URL);

const taskUrls = taskUrlService.composeCommonAPIMethodUrls();

export namespace TaskApi {
  export async function getTasks(
    param: TaskFilterParamsDto
  ): Promise<TaskApiResponse.Get> {
    const url = taskUrls.getAndCreate;
    const method = http.get<TaskDto[]>(url, param);
    return composeHttpMethodResult(method);
  }

  export async function deleteTask(
    id: Task["id"]
  ): Promise<TaskApiResponse.Delete> {
    const url = taskUrls.updateAndDeleteWithId(id);
    const method = http.delete<boolean>(url);
    return composeHttpMethodResult(method);
  }

  export async function createTask(
    body: TaskCreationDto
  ): Promise<TaskApiResponse.Create> {
    const url = taskUrls.getAndCreate;
    const method = http.post<TaskDto>(url, body);
    return composeHttpMethodResult(method);
  }

  export async function updateTask(
    id: Task["id"],
    body: TaskCreationDto
  ): Promise<TaskApiResponse.Update> {
    const url = taskUrls.updateAndDeleteWithId(id);
    const method = http.patch<TaskDto>(url, body);
    return composeHttpMethodResult(method);
  }
}
