import {
  IConfigManagerUpdate,
  ITenantCreateUpdateDto,
  ITenantDto,
} from "@/features/types/dtos";
import { IConfigManagerDto } from "@/features/types/dtos/config-manager.dto";

import { Response } from "../types";
import { IConfigManager } from "./../../features/types/models/config-manager";

export type RequestGetTenantResult = Response<ITenantDto>;
export type RequestUpdateTenantResult = Response<ITenantDto>;

export type RequestGetConfigManagerResult = Response<IConfigManagerDto>;
export type RequestUpdateConfigManagerResult = Response<IConfigManagerDto>;
export type RequestUpdateConfigRoleUserResult = Response<boolean>;

export type RequestUpdateTenantBody = ITenantCreateUpdateDto;
export type RequestUpdateConfigManagerBody = IConfigManagerUpdate;

export type RequestParamsConfigRoleUser = {
  user_id: number;
  groups: number[];
};
