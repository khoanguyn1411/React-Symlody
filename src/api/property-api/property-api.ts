import { IProperty, IPropertyDto } from "@/features/types";
import { TPropertyParamQueryDto } from "@/features/types/queries";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getProperties: () => `property/`,
  deleteProperty: (id: IProperty["id"]) => `property/${id}`,
};

export const PropertyApi = {
  async getProperties(
    param: TPropertyParamQueryDto
  ): Promise<Types.RequestGetPropertiesResult> {
    const url = routes.getProperties();
    const method = http.get<IPropertyDto[]>(url, param);
    return composeHttpMethodResult(method);
  },

  async createProperty(
    body: FormData
  ): Promise<Types.RequestCreatePropertyResult> {
    const url = routes.getProperties();
    const method = http.post<IPropertyDto>(url, body);
    return composeHttpMethodResult(method);
  },

  async deleteProperty(
    id: IProperty["id"]
  ): Promise<Types.RequestDeletePropertyResult> {
    const url = routes.deleteProperty(id);
    const method = http.delete<boolean>(url);

    return composeHttpMethodResult(method);
  },
};
