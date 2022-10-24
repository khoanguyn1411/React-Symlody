import { ApiResponse } from "apisauce";

import { IDepartmentDto, ITenantDto } from "@/features/types";

import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import { IConfigManager } from "./../../features/types/models/config-manager";
import * as Types from "./types";

const routes = {
  //DEPARTMENT
  getDepartments: () => `department/`,
  updateDepartment: (id: number) => `department/${id}/`,
  createDepartment: () => `department/`,
  //TENANT
  getTenant: () => `config/`,
  updateTenant: (id: number) => `config/${id}/`,
  //CONFIG MANAGER
  getConfigManager: () => `config/managers/`,
  updateConfigManager: () => `config/managers/`,
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

  async updateTenant(
    id: number,
    body: Types.RequestUpdateTenantBody
  ): Promise<Types.RequestUpdateTenantResult> {
    const url = routes.updateTenant(id);
    const result: ApiResponse<ITenantDto> = await Api.http.patch(url, {
      ...body,
    });

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

  async updateDepartment(
    id: number,
    body: Types.RequestUpdateDepartmentBody
  ): Promise<Types.RequestUpdateDepartmentResult> {
    const url = routes.updateDepartment(id);
    const result: ApiResponse<IDepartmentDto> = await Api.http.patch(url, {
      ...body,
    });

    return returnResponse(result);
  },

  async getConfigManager(): Promise<Types.RequestGetConfigManagerResult> {
    const url = routes.getConfigManager();
    const result: ApiResponse<IConfigManager> = await Api.http.get(url);

    return returnResponse(result);
  },
  async updateConfigManager(
    body: Types.RequestUpdateConfigManagerBody
  ): Promise<Types.RequestUpdateConfigManagerResult> {
    const url = routes.updateConfigManager();
    const result: ApiResponse<IConfigManager> = await Api.http.patch(url, body);

    return returnResponse(result);
  },
};
