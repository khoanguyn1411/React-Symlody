import {
  Organization,
  OrganizationDto,
  User,
  UserShortDto,
} from "@/features/types";
import {
  LeadersAndManagersDto,
  UserPermissionConfigCreationDto,
} from "@/features/types/dtos/config-permission.dto";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import { ConfigApiResponse } from "./types";

const BASE_PATH = "config";
const configUrlService = new ComposeUrlService(BASE_PATH);

const configUrls = {
  getOrganization: configUrlService.getBaseUrl(),
  updateOrganization: (id: Organization["id"]) =>
    configUrlService.constructUrlWithParam(id),
  getConfigManager: configUrlService.concatWith(["managers"]),
  updateConfigRoleUser: (userId: User["id"]) =>
    configUrlService.concatWith(["roles", `${userId}`]),
};

export namespace ConfigApi {
  export async function getOrganization(): Promise<ConfigApiResponse.GetOrganization> {
    const url = configUrls.getOrganization;
    const method = http.get<OrganizationDto>(url);
    return composeHttpMethodResult(method);
  }

  export async function updateOrganization(
    id: number,
    body: FormData
  ): Promise<ConfigApiResponse.UpdateOrganization> {
    const url = configUrls.updateOrganization(id);
    return composeHttpMethodResult(http.patch<OrganizationDto>(url, body));
  }

  export async function getConfigManager(): Promise<ConfigApiResponse.GetConfigManager> {
    const url = configUrls.getConfigManager;
    const method = http.get<LeadersAndManagersDto>(url);
    return composeHttpMethodResult(method);
  }

  export async function updateConfigRoleUser(
    params: UserPermissionConfigCreationDto,
    id: UserShortDto["id"]
  ): Promise<ConfigApiResponse.UpdateConfigRoleUser> {
    const url = configUrls.updateConfigRoleUser(id);
    const method = http.patch<UserShortDto>(url, params);
    return composeHttpMethodResult(method);
  }
}
