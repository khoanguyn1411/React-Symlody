import {
  IDepartmentCreateUpdateDto,
  IDepartmentDto,
  ITenantCreateUpdateDto,
  ITenantDto,
} from "@/features/types/dtos";

import { Response } from "../types";

export type RequestGetDepartmentResult = Response<IDepartmentDto[]>;
export type RequestGetTenantResult = Response<ITenantDto>;
export type RequestUpdateTenantResult = Response<ITenantDto>;

export type RequestCreateDepartmentResult = Response<IDepartmentDto>;
export type RequestUpdateDepartmentResult = Response<IDepartmentDto>;

export type RequestCreateDepartmentBody = IDepartmentCreateUpdateDto;
export type RequestUpdateDepartmentBody = IDepartmentCreateUpdateDto;
export type RequestUpdateTenantBody = ITenantCreateUpdateDto;
