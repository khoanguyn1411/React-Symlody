import {
  IConfigManagerUpdate,
  IDepartmentCreateUpdateDto,
  IDepartmentDto,
  ITenantCreateUpdateDto,
  ITenantDto,
} from "@/features/types/dtos";

import { Response } from "../types";
import { IConfigManager } from "./../../features/types/models/config-manager";

export type RequestGetDepartmentResult = Response<IDepartmentDto[]>;
export type RequestGetTenantResult = Response<ITenantDto>;
export type RequestUpdateTenantResult = Response<ITenantDto>;

export type RequestCreateDepartmentResult = Response<IDepartmentDto>;
export type RequestUpdateDepartmentResult = Response<IDepartmentDto>;

export type RequestGetConfigManagerResult = Response<IConfigManager>;
export type RequestUpdateConfigManagerResult = Response<IConfigManager>;

export type RequestCreateDepartmentBody = IDepartmentCreateUpdateDto;
export type RequestUpdateDepartmentBody = IDepartmentCreateUpdateDto;
export type RequestUpdateTenantBody = ITenantCreateUpdateDto;
export type RequestUpdateConfigManagerBody = IConfigManagerUpdate;
