import { IDepartmentDto, ITenantDto } from "@/features/types/dtos";

import { Response } from "../types";

export type RequestGetDepartmentResult = Response<IDepartmentDto[]>;
export type RequestGetTenantResult = Response<ITenantDto>;
