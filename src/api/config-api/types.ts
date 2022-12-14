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

export type RequestGetOrganizationResult = Response<OrganizationDto>;
export type RequestUpdateOrganizationResult = Response<
  OrganizationDto,
  OrganizationCreationDto
>;

export type RequestGetConfigManagerResult = Response<LeadersAndManagersDto>;
export type RequestUpdateConfigManagerResult = Response<LeadersAndManagersDto>;
export type RequestUpdateConfigRoleUserResult = Response<
  UserShortDto,
  UserPermissionConfigCreationDto
>;

export type RequestUpdateOrganizationBody = OrganizationCreationDto;
export type RequestParamsConfigRoleUser = UserPermissionConfigCreationDto;
