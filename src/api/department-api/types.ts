import {
  AppResponseDto,
  DepartmentCreationDto,
  DepartmentDto,
} from "@/features/types";

export namespace DepartmentApiResponse {
  export type GetDepartments = AppResponseDto<DepartmentDto[]>;
  export type CreateDepartment = AppResponseDto<
    DepartmentDto,
    DepartmentCreationDto
  >;
  export type UpdateDepartment = AppResponseDto<
    DepartmentDto,
    DepartmentCreationDto
  >;
  export type DeleteDepartment = AppResponseDto<boolean>;
}
