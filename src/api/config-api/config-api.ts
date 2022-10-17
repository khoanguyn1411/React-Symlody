import { ApiResponse } from "apisauce";

import { IDepartmentDto, ITenantDto } from "@/features/types";

import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getDepartments: () => `department/`,
  updateDepartment: () => `config/`,
  getTenant: () => `config/`,
  createDepartment: () => `department/`,
};

export const ConfigApi = {
  async getDepartments(): Promise<Types.RequestGetDepartmentResult> {
    const url = routes.getDepartments();
    const result: ApiResponse<IDepartmentDto[]> = await Api.http.get(url);

    return returnResponse(result);
  },

  async getTenant(): Promise<Types.RequestGetTenantResult> {
    const url = routes.getTenant();
    const result: ApiResponse<ITenantDto> = await Api.http.get(url);

    return returnResponse(result);
  },

  async createDepartment(
    body: Types.RequestCreateDepartmentBody
  ): Promise<Types.RequestCreateDepartmentResult> {
    const url = routes.createDepartment();
    const result: ApiResponse<IDepartmentDto> = await Api.http.post(url, {
      ...body,
    });

    return returnResponse(result);
  },
};
