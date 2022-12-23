import { Property, PropertyDto } from "@/features/types";
import { PropertyFilterParamsDto } from "@/features/types/dtos/filter-params";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const BASE_URL = "property";
const propertyUrlService = new ComposeUrlService(BASE_URL);

const propertyUrls = propertyUrlService.composeCommonAPIMethodUrls();

export const PropertyApi = {
  async getProperties(
    param: PropertyFilterParamsDto
  ): Promise<Types.RequestGetPropertiesResult> {
    const url = propertyUrls.getAndCreate;
    const method = http.get<PropertyDto[]>(url, param);
    return composeHttpMethodResult(method);
  },

  async createProperty(
    body: FormData
  ): Promise<Types.RequestCreatePropertyResult> {
    const url = propertyUrls.getAndCreate;
    const method = http.post<PropertyDto>(url, body);
    return composeHttpMethodResult(method);
  },

  async deleteProperty(
    id: Property["id"]
  ): Promise<Types.RequestDeletePropertyResult> {
    const url = propertyUrls.updateAndDeleteWithId(id);
    const method = http.delete<boolean>(url);

    return composeHttpMethodResult(method);
  },

  async updateProperty(
    id: Property["id"],
    body: FormData
  ): Promise<Types.RequestUpdatePropertyResult> {
    const url = propertyUrls.updateAndDeleteWithId(id);
    const method = http.patch<PropertyDto>(url, body);
    return composeHttpMethodResult(method);
  },
};
