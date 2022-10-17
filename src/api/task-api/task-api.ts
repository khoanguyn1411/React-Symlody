import { ITaskDto } from "@/features/types";

import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getTasks: () => `task/`,
};

export const TaskApi = {
  async getTasks(): Promise<Types.RequestGetTasksResult> {
    const url = routes.getTasks();
    const result = await Api.http.get<ITaskDto[]>(url);
    return returnResponse(result);
  },
};
