import { ITenantDto } from "@/features/types";
import {
  IConfigInfoDto,
  IConfigManagerDto,
} from "@/features/types/dtos/config-manager.dto";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
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
    return composeHttpMethodResult(http.get<ITenantDto>(url));
  },

  async updateTenant(
    id: number,
    body: FormData
  ): Promise<Types.RequestUpdateTenantResult> {
    const url = routes.updateTenant(id);
    return composeHttpMethodResult(http.patch<ITenantDto>(url, body));
  },

  async getConfigManager(): Promise<Types.RequestGetConfigManagerResult> {
    const url = routes.getConfigManager();
    return composeHttpMethodResult(http.get<IConfigManagerDto>(url));
  },

  async updateConfigManager(
    body: Types.RequestUpdateConfigManagerBody
  ): Promise<Types.RequestUpdateConfigManagerResult> {
    const url = routes.updateConfigManager();
    return composeHttpMethodResult(http.patch<IConfigManagerDto>(url, body));
  },

  async updateConfigRoleUser(
    params: Types.RequestParamsConfigRoleUser
  ): Promise<Types.RequestUpdateConfigRoleUserResult> {
    const url = routes.updateConfigRoleUser(params.user_id);
    return composeHttpMethodResult(http.patch<IConfigInfoDto>(url, params));
  },
};
