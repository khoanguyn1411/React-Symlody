import { OrganizationDto, UserShortDto } from "@/features/types";
import { LeadersAndManagersDto } from "@/features/types/dtos/config-permission.dto";

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
    const method = http.get<OrganizationDto>(url);
    return composeHttpMethodResult(method);
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
    const method = http.get<LeadersAndManagersDto>(url);
    return composeHttpMethodResult(method);
  },

  async updateConfigRoleUser(
    params: Types.RequestParamsConfigRoleUser
  ): Promise<Types.RequestUpdateConfigRoleUserResult> {
    const url = routes.updateConfigRoleUser(params.user_id);
    const method = http.patch<UserShortDto>(url, params);
    return composeHttpMethodResult(method);
  },
};
