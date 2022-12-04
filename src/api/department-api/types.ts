import { DepartmentCreationDto, DepartmentDto } from "@/features/types";

import { Response } from "../api-response";

export type RequestCreateDepartmentBody = DepartmentCreationDto;
export type RequestUpdateDepartmentBody = DepartmentCreationDto;

export type RequestGetDepartmentResult = Response<DepartmentDto[]>;
export type RequestCreateDepartmentResult = Response<
  DepartmentDto,
  DepartmentCreationDto
>;
export type RequestUpdateDepartmentResult = Response<
  DepartmentDto,
  DepartmentCreationDto
>;
export type RequestDeleteDepartmentResult = Response<boolean>;
