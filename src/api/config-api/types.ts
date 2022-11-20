import {
  IConfigManagerUpdate,
  ITenantCreateUpdateDto,
  ITenantDto,
} from "@/features/types/dtos";

import { Response } from "../types";
import { IConfigManager } from "./../../features/types/models/config-manager";

export type RequestGetTenantResult = Response<ITenantDto>;
export type RequestUpdateTenantResult = Response<ITenantDto>;

export type RequestGetConfigManagerResult = Response<IConfigManager>;
export type RequestUpdateConfigManagerResult = Response<IConfigManager>;
export type RequestUpdateConfigRoleUserResult = Response<boolean>;

export type RequestUpdateTenantBody = ITenantCreateUpdateDto;
export type RequestUpdateConfigManagerBody = IConfigManagerUpdate;

export type RequestParamsConfigRoleUser = {
  user_id: number;
  groups: number[];
};
