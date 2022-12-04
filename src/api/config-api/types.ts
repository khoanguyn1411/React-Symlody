import { IConfigManagerUpdate } from "@/features/types";
import {
  OrganizationCreationDto,
  OrganizationDto,
} from "@/features/types/dtos";
import {
  IConfigInfoDto,
  IConfigManagerDto,
  IConfigUserUpdateDto,
} from "@/features/types/dtos/config-manager.dto";

import { Response } from "../api-response";

export type RequestGetTenantResult = Response<OrganizationDto>;
export type RequestUpdateTenantResult = Response<
  OrganizationDto,
  OrganizationCreationDto
>;

export type RequestGetConfigManagerResult = Response<IConfigManagerDto>;
export type RequestUpdateConfigManagerResult = Response<IConfigManagerDto>;
export type RequestUpdateConfigRoleUserResult = Response<
  IConfigInfoDto,
  IConfigUserUpdateDto
>;

export type RequestUpdateTenantBody = OrganizationCreationDto;
export type RequestUpdateConfigManagerBody = IConfigManagerUpdate;

export type RequestParamsConfigRoleUser = IConfigUserUpdateDto;
