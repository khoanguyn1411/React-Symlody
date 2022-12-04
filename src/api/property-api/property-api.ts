import { Property, PropertyDto } from "@/features/types";
import { PropertyFilterParamsDto } from "@/features/types/dtos/filter-params";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const routes = {
  getProperties: () => `property/`,
  deleteProperty: (id: Property["id"]) => `property/${id}`,
};

export const PropertyApi = {
  async getProperties(
    param: PropertyFilterParamsDto
  ): Promise<Types.RequestGetPropertiesResult> {
    const url = routes.getProperties();
    const method = http.get<PropertyDto[]>(url, param);
    return composeHttpMethodResult(method);
  },

  async createProperty(
    body: FormData
  ): Promise<Types.RequestCreatePropertyResult> {
    const url = routes.getProperties();
    const method = http.post<PropertyDto>(url, body);
    return composeHttpMethodResult(method);
  },

  async deleteProperty(
    id: Property["id"]
  ): Promise<Types.RequestDeletePropertyResult> {
    const url = routes.deleteProperty(id);
    const method = http.delete<boolean>(url);

    return composeHttpMethodResult(method);
  },
};
