import { DepartmentCreationDto, DepartmentDto } from "@/features/types";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import { DepartmentApiResponse } from "./types";

const BASE_PATH = "department";
const departmentUrlService = new ComposeUrlService(BASE_PATH);

const departmentUrls = departmentUrlService.composeCommonAPIMethodUrls();

export namespace DepartmentApi {
  export async function getDepartments(): Promise<DepartmentApiResponse.GetDepartments> {
    const url = departmentUrls.getAndCreate;
    return composeHttpMethodResult(http.get<DepartmentDto[]>(url));
  }

  export async function createDepartment(
    body: DepartmentCreationDto
  ): Promise<DepartmentApiResponse.CreateDepartment> {
    const url = departmentUrls.getAndCreate;
    return composeHttpMethodResult(http.post<DepartmentDto>(url, body));
  }

  export async function updateDepartment(
    id: number,
    body: DepartmentCreationDto
  ): Promise<DepartmentApiResponse.UpdateDepartment> {
    const url = departmentUrls.updateAndDeleteWithId(id);
    return composeHttpMethodResult(http.patch<DepartmentDto>(url, body));
  }

  export async function deleteDepartment(
    id: number
  ): Promise<DepartmentApiResponse.DeleteDepartment> {
    const url = departmentUrls.updateAndDeleteWithId(id);
    return composeHttpMethodResult(http.delete<boolean>(url));
  }
}
