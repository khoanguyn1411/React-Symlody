import { ApiResponse, ApisauceInstance } from "apisauce";

import { IPropertyDto } from "@/features/types";

import { API_URL } from "../api-config";
import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";

const prefix = API_URL + "/api";
const api: ApisauceInstance = Api.getInstance();

const routes = {
  getProperties: () => `${prefix}/property/`,
};

export const PropertyApi = {
  async getProperties(): Promise<Types.RequestGetPropertiesResult> {
    const url = routes.getProperties();
    const result: ApiResponse<IPropertyDto[]> = await api.get(url);
    return returnResponse(result);
  },
};
