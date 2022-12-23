import {
  OrganizationCreationDto,
  OrganizationDto,
  UserShortDto,
} from "@/features/types/dtos";
import {
  LeadersAndManagersDto,
  UserPermissionConfigCreationDto,
} from "@/features/types/dtos/config-permission.dto";

import { Response } from "../api-response";

export namespace ConfigApiResponse {
  export type GetOrganization = Response<OrganizationDto>;
  export type UpdateOrganization = Response<
    OrganizationDto,
    OrganizationCreationDto
  >;

  export type GetConfigManager = Response<LeadersAndManagersDto>;
  export type UpdateConfigManager = Response<LeadersAndManagersDto>;
  export type UpdateConfigRoleUser = Response<
    UserShortDto,
    UserPermissionConfigCreationDto
  >;
}
