import {
  Organization,
  OrganizationDto,
  User,
  UserShortDto,
} from "@/features/types";
import { LeadersAndManagersDto } from "@/features/types/dtos/config-permission.dto";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const BASE_URL = "config";
const configUrls = new ComposeUrlService(BASE_URL);

const apiModuleUrls = {
  getOrganization: configUrls.getBaseUrl(),
  updateOrganization: (id: Organization["id"]) =>
    configUrls.constructUrlWithId(id),
  getConfigManager: configUrls.composeWith(["managers"]),
  updateConfigRoleUser: (userId: User["id"]) =>
    configUrls.composeWith(["roles", `${userId}`]),
};

export const ConfigApi = {
  async getOrganization(): Promise<Types.RequestGetOrganizationResult> {
    const url = apiModuleUrls.getOrganization;
    const method = http.get<OrganizationDto>(url);
    return composeHttpMethodResult(method);
  },

  async updateOrganization(
    id: number,
    body: FormData
  ): Promise<Types.RequestUpdateOrganizationResult> {
    const url = apiModuleUrls.updateOrganization(id);
    return composeHttpMethodResult(http.patch<OrganizationDto>(url, body));
  },

  async getConfigManager(): Promise<Types.RequestGetConfigManagerResult> {
    const url = apiModuleUrls.getConfigManager;
    const method = http.get<LeadersAndManagersDto>(url);
    return composeHttpMethodResult(method);
  },

  async updateConfigRoleUser(
    params: Types.RequestParamsConfigRoleUser,
    id: UserShortDto["id"]
  ): Promise<Types.RequestUpdateConfigRoleUserResult> {
    const url = apiModuleUrls.updateConfigRoleUser(id);
    const method = http.patch<UserShortDto>(url, params);
    return composeHttpMethodResult(method);
  },
};
