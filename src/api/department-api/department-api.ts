import { ApiResponse, ApisauceInstance } from "apisauce";

import { IDepartmentDto } from "@/features/types";

import { API_URL } from "../api-config";
import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";
const prefix = API_URL + "/api";

const api: ApisauceInstance = Api.getInstance();

const routes = {
  getDepartments: () => `${prefix}/department/`,
};

export const DepartmentApi = {
  async getDepartments(): Promise<Types.RequestGetDepartmentResult> {
    const url = routes.getDepartments();
    const result: ApiResponse<IDepartmentDto[]> = await api.get(url);

    return returnResponse(result);
  },
};
