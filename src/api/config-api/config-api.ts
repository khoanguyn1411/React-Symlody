import { ITenantDto } from "@/features/types";
import { IConfigManagerDto } from "@/features/types/dtos/config-manager.dto";

import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";

const routes = {
  //TENANT
  getTenant: () => `config/`,
  updateTenant: (id: number) => `config/${id}/`,
  //CONFIG MANAGER
  getConfigManager: () => `config/managers/`,
  updateConfigManager: () => `config/managers/`,
  updateConfigRoleUser: (userId: number) => `config/roles/${userId}/`,
};

export const ConfigApi = {
  async getTenant(): Promise<Types.RequestGetTenantResult> {
    const url = routes.getTenant();
    const result = await Api.http.get<ITenantDto>(url);

    return returnResponse(result);
  },

  async updateTenant(
    id: number,
    body: Types.RequestUpdateTenantBody
  ): Promise<Types.RequestUpdateTenantResult> {
    const url = routes.updateTenant(id);
    const result = await Api.http.patch<ITenantDto>(url, {
      ...body,
    });

    return returnResponse(result);
  },

  async getConfigManager(): Promise<Types.RequestGetConfigManagerResult> {
    const url = routes.getConfigManager();
    const result = await Api.http.get<IConfigManagerDto>(url);

    return returnResponse(result);
  },

  async updateConfigManager(
    body: Types.RequestUpdateConfigManagerBody
  ): Promise<Types.RequestUpdateConfigManagerResult> {
    const url = routes.updateConfigManager();
    const result = await Api.http.patch<IConfigManagerDto>(url, body);

    return returnResponse(result);
  },

  async updateConfigRoleUser(
    params: Types.RequestParamsConfigRoleUser
  ): Promise<Types.RequestUpdateConfigManagerResult> {
    const url = routes.updateConfigRoleUser(params.user_id);
    const result = await Api.http.patch<IConfigManagerDto>(url, {
      ...params,
      groups: [...params.groups],
    });

    return returnResponse(result);
  },
};
