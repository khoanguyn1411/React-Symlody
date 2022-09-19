import { ApisauceInstance } from "apisauce";

import { IProperty, IPropertyDto } from "@/features/types";
import { TPropertyParamQueryDto } from "@/features/types/queries";

import { API_URL } from "../api-config";
import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";

const prefix = API_URL + "/api";
const api: ApisauceInstance = Api.getInstance();

const routes = {
  getProperties: () => `${prefix}/property/`,
  deleteProperty: (id) => `${prefix}/property/${id}`,
};

export const PropertyApi = {
  async getProperties(
    param: TPropertyParamQueryDto
  ): Promise<Types.RequestGetPropertiesResult> {
    const url = routes.getProperties();
    const result = await api.get<IPropertyDto[]>(url, param);
    return returnResponse(result);
  },

  async createProperty(): Promise<Types.RequestCreatePropertyResult> {
    const url = routes.getProperties();
    const result = await api.post<IPropertyDto>(url);
    return returnResponse(result);
  },

  async deleteProperty(
    id: IProperty["id"]
  ): Promise<Types.RequestDeletePropertyResult> {
    const url = routes.deleteProperty(id);
    const result = await api.delete<Types.RequestDeletePropertyResult>(url);

    return returnResponse(result);
  },
};
