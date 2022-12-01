import { ApiResponse } from "apisauce";

import { IDepartmentDto } from "@/features/types";

import { http } from "../api-core";
import { returnResponse } from "../api-utilities";
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
    const result: ApiResponse<IDepartmentDto[]> = await http.get(url);

    return returnResponse(result);
  },

  async createDepartment(
    body: Types.RequestCreateDepartmentBody
  ): Promise<Types.RequestCreateDepartmentResult> {
    const url = routes.createDepartment();
    const result: ApiResponse<IDepartmentDto> = await http.post(url, {
      ...body,
    });

    return returnResponse(result);
  },

  async updateDepartment(
    id: number,
    body: Types.RequestUpdateDepartmentBody
  ): Promise<Types.RequestUpdateDepartmentResult> {
    const url = routes.updateDepartment(id);
    const result: ApiResponse<IDepartmentDto> = await http.patch(url, {
      ...body,
    });

    return returnResponse(result);
  },

  async deleteDepartment(
    id: number
  ): Promise<Types.RequestDeleteDepartmentResult> {
    const url = routes.deleteDepartment(id);
    const result: ApiResponse<boolean> = await http.delete(url);

    return returnResponse(result);
  },
};
