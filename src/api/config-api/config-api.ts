import { OrganizationDto } from "@/features/types";
import {
  IConfigInfoDto,
  IConfigManagerDto,
} from "@/features/types/dtos/config-manager.dto";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const routes = {
  //TENANT
  getOrganization: () => `config/`,
  updateOrganization: (id: number) => `config/${id}/`,
  //CONFIG MANAGER
  getConfigManager: () => `config/managers/`,
  updateConfigRoleUser: (userId: number) => `config/roles/${userId}/`,
};

export const ConfigApi = {
  async getOrganization(): Promise<Types.RequestGetTenantResult> {
    const url = routes.getOrganization();
    return composeHttpMethodResult(http.get<OrganizationDto>(url));
  },

  async updateOrganization(
    id: number,
    body: FormData
  ): Promise<Types.RequestUpdateTenantResult> {
    const url = routes.updateOrganization(id);
    return composeHttpMethodResult(http.patch<OrganizationDto>(url, body));
  },

  async getConfigManager(): Promise<Types.RequestGetConfigManagerResult> {
    const url = routes.getConfigManager();
    return composeHttpMethodResult(http.get<IConfigManagerDto>(url));
  },

  async updateConfigRoleUser(
    params: Types.RequestParamsConfigRoleUser
  ): Promise<Types.RequestUpdateConfigRoleUserResult> {
    const url = routes.updateConfigRoleUser(params.user_id);
    return composeHttpMethodResult(http.patch<IConfigInfoDto>(url, params));
  },
};
