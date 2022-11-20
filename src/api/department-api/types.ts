import { IDepartmentCreateUpdateDto, IDepartmentDto } from "@/features/types";

import { Response } from "../types";

export type RequestCreateDepartmentBody = IDepartmentCreateUpdateDto;
export type RequestUpdateDepartmentBody = IDepartmentCreateUpdateDto;

export type RequestGetDepartmentResult = Response<IDepartmentDto[]>;
export type RequestCreateDepartmentResult = Response<IDepartmentDto>;
export type RequestUpdateDepartmentResult = Response<IDepartmentDto>;
export type RequestDeleteDepartmentResult = Response<boolean>;
