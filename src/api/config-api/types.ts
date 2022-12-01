import {
  IConfigManagerUpdate,
  ITenantCreateUpdateDto,
  ITenantDto,
} from "@/features/types/dtos";
import {
  IConfigInfoDto,
  IConfigManagerDto,
  IConfigUserUpdateDto,
} from "@/features/types/dtos/config-manager.dto";

import { Response } from "../api-response";

export type RequestGetTenantResult = Response<ITenantDto>;
export type RequestUpdateTenantResult = Response<
  ITenantDto,
  ITenantCreateUpdateDto
>;

export type RequestGetConfigManagerResult = Response<IConfigManagerDto>;
export type RequestUpdateConfigManagerResult = Response<IConfigManagerDto>;
export type RequestUpdateConfigRoleUserResult = Response<
  IConfigInfoDto,
  IConfigUserUpdateDto
>;

export type RequestUpdateTenantBody = ITenantCreateUpdateDto;
export type RequestUpdateConfigManagerBody = IConfigManagerUpdate;

export type RequestParamsConfigRoleUser = IConfigUserUpdateDto;
