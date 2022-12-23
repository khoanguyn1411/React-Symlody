import { DepartmentDto } from "@/features/types";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const BASE_URL = "department";
const departmentUrls = new ComposeUrlService(BASE_URL);

const apiModuleUrls = departmentUrls.composeCommonAPIMethodUrls();

export const DepartmentApi = {
  async getDepartments(): Promise<Types.RequestGetDepartmentResult> {
    const url = apiModuleUrls.getAndCreate;
    return composeHttpMethodResult(http.get<DepartmentDto[]>(url));
  },

  async createDepartment(
    body: Types.RequestCreateDepartmentBody
  ): Promise<Types.RequestCreateDepartmentResult> {
    const url = apiModuleUrls.getAndCreate;
    return composeHttpMethodResult(http.post<DepartmentDto>(url, body));
  },

  async updateDepartment(
    id: number,
    body: Types.RequestUpdateDepartmentBody
  ): Promise<Types.RequestUpdateDepartmentResult> {
    const url = apiModuleUrls.updateAndDeleteWithId(id);
    return composeHttpMethodResult(http.patch<DepartmentDto>(url, body));
  },

  async deleteDepartment(
    id: number
  ): Promise<Types.RequestDeleteDepartmentResult> {
    const url = apiModuleUrls.updateAndDeleteWithId(id);
    return composeHttpMethodResult(http.delete<boolean>(url));
  },
};
