import { IDepartmentCreateUpdateDto, IDepartmentDto } from "@/features/types";

import { Response } from "../api-response";

export type RequestCreateDepartmentBody = IDepartmentCreateUpdateDto;
export type RequestUpdateDepartmentBody = IDepartmentCreateUpdateDto;

export type RequestGetDepartmentResult = Response<IDepartmentDto[]>;
export type RequestCreateDepartmentResult = Response<
  IDepartmentDto,
  IDepartmentCreateUpdateDto
>;
export type RequestUpdateDepartmentResult = Response<
  IDepartmentDto,
  IDepartmentCreateUpdateDto
>;
export type RequestDeleteDepartmentResult = Response<boolean>;
