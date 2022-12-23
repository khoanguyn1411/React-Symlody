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
const configUrlService = new ComposeUrlService(BASE_URL);

const configUrls = {
  getOrganization: configUrlService.getBaseUrl(),
  updateOrganization: (id: Organization["id"]) =>
    configUrlService.constructUrlWithId(id),
  getConfigManager: configUrlService.composeWith(["managers"]),
  updateConfigRoleUser: (userId: User["id"]) =>
    configUrlService.composeWith(["roles", `${userId}`]),
};

export const ConfigApi = {
  async getOrganization(): Promise<Types.RequestGetOrganizationResult> {
    const url = configUrls.getOrganization;
    const method = http.get<OrganizationDto>(url);
    return composeHttpMethodResult(method);
  },

  async updateOrganization(
    id: number,
    body: FormData
  ): Promise<Types.RequestUpdateOrganizationResult> {
    const url = configUrls.updateOrganization(id);
    return composeHttpMethodResult(http.patch<OrganizationDto>(url, body));
  },

  async getConfigManager(): Promise<Types.RequestGetConfigManagerResult> {
    const url = configUrls.getConfigManager;
    const method = http.get<LeadersAndManagersDto>(url);
    return composeHttpMethodResult(method);
  },

  async updateConfigRoleUser(
    params: Types.RequestParamsConfigRoleUser,
    id: UserShortDto["id"]
  ): Promise<Types.RequestUpdateConfigRoleUserResult> {
    const url = configUrls.updateConfigRoleUser(id);
    const method = http.patch<UserShortDto>(url, params);
    return composeHttpMethodResult(method);
  },
};
