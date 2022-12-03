import { IDepartmentCreateUpdateDto, DepartmentDto } from "@/features/types";

import { Response } from "../api-response";

export type RequestCreateDepartmentBody = IDepartmentCreateUpdateDto;
export type RequestUpdateDepartmentBody = IDepartmentCreateUpdateDto;

export type RequestGetDepartmentResult = Response<DepartmentDto[]>;
export type RequestCreateDepartmentResult = Response<
  DepartmentDto,
  IDepartmentCreateUpdateDto
>;
export type RequestUpdateDepartmentResult = Response<
  DepartmentDto,
  IDepartmentCreateUpdateDto
>;
export type RequestDeleteDepartmentResult = Response<boolean>;
