import { OrganizationDto, UserShortDto } from "@/features/types";
import { LeadersAndManagersDto } from "@/features/types/dtos/config-permission.dto";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getOrganization: () => `config/`,
  updateOrganization: (id: number) => `config/${id}/`,
  getConfigManager: () => `config/managers/`,
  updateConfigRoleUser: (userId: number) => `config/roles/${userId}/`,
};

export const ConfigApi = {
  async getOrganization(): Promise<Types.RequestGetOrganizationResult> {
    const url = routes.getOrganization();
    const method = http.get<OrganizationDto>(url);
    return composeHttpMethodResult(method);
  },

  async updateOrganization(
    id: number,
    body: FormData
  ): Promise<Types.RequestUpdateOrganizationResult> {
    const url = routes.updateOrganization(id);
    return composeHttpMethodResult(http.patch<OrganizationDto>(url, body));
  },

  async getConfigManager(): Promise<Types.RequestGetConfigManagerResult> {
    const url = routes.getConfigManager();
    const method = http.get<LeadersAndManagersDto>(url);
    return composeHttpMethodResult(method);
  },

  async updateConfigRoleUser(
    params: Types.RequestParamsConfigRoleUser,
    id: UserShortDto["id"]
  ): Promise<Types.RequestUpdateConfigRoleUserResult> {
    const url = routes.updateConfigRoleUser(id);
    const method = http.patch<UserShortDto>(url, params);
    return composeHttpMethodResult(method);
  },
};
