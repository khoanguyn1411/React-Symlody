import { DepartmentDto } from "@/features/types";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getDepartments: () => `department/`,
  updateDepartment: (id: number) => `department/${id}/`,
  createDepartment: () => `department/`,
  deleteDepartment: (id: number) => `department/${id}/`,
};

export const DepartmentApi = {
  async getDepartments(): Promise<Types.RequestGetDepartmentResult> {
    const url = routes.getDepartments();
    return composeHttpMethodResult(http.get<DepartmentDto[]>(url));
  },

  async createDepartment(
    body: Types.RequestCreateDepartmentBody
  ): Promise<Types.RequestCreateDepartmentResult> {
    const url = routes.createDepartment();
    return composeHttpMethodResult(http.post<DepartmentDto>(url, body));
  },

  async updateDepartment(
    id: number,
    body: Types.RequestUpdateDepartmentBody
  ): Promise<Types.RequestUpdateDepartmentResult> {
    const url = routes.updateDepartment(id);
    return composeHttpMethodResult(http.patch<DepartmentDto>(url, body));
  },

  async deleteDepartment(
    id: number
  ): Promise<Types.RequestDeleteDepartmentResult> {
    const url = routes.deleteDepartment(id);
    return composeHttpMethodResult(http.delete<boolean>(url));
  },
};
