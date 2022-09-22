import { ApiResponse } from "apisauce";

import { IDepartmentDto } from "@/features/types";

import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getDepartments: () => `department/`,
};

export const DepartmentApi = {
  async getDepartments(): Promise<Types.RequestGetDepartmentResult> {
    const url = routes.getDepartments();
    const result: ApiResponse<IDepartmentDto[]> = await Api.http.get(url);

    return returnResponse(result);
  },
};
