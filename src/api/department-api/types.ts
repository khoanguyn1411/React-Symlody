import { DepartmentCreationDto, DepartmentDto } from "@/features/types";

import { Response } from "../api-response";

export namespace DepartmentApiResponse {
  export type GetDepartments = Response<DepartmentDto[]>;
  export type CreateDepartment = Response<DepartmentDto, DepartmentCreationDto>;
  export type UpdateDepartment = Response<DepartmentDto, DepartmentCreationDto>;
  export type DeleteDepartment = Response<boolean>;
}
