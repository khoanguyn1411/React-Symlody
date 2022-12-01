import { IProperty, IPropertyDto } from "@/features/types";
import { TPropertyParamQueryDto } from "@/features/types/queries";

import { http } from "../api-core";
import { returnResponse } from "../api-utilities";
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
    const result = await http.get<IPropertyDto[]>(url, param);
    return returnResponse(result);
  },

  async createProperty(
    body: FormData
  ): Promise<Types.RequestCreatePropertyResult> {
    const url = routes.getProperties();
    const result = await http.post<IPropertyDto>(url, body);
    return returnResponse(result);
  },

  async deleteProperty(
    id: IProperty["id"]
  ): Promise<Types.RequestDeletePropertyResult> {
    const url = routes.deleteProperty(id);
    const result = await http.delete<boolean>(url);

    return returnResponse(result);
  },
};
