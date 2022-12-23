import { Property, PropertyDto } from "@/features/types";
import { PropertyFilterParamsDto } from "@/features/types/dtos/filter-params";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import { PropertyApiResponse } from "./types";

const BASE_URL = "property";
const propertyUrlService = new ComposeUrlService(BASE_URL);

const propertyUrls = propertyUrlService.composeCommonAPIMethodUrls();

export namespace PropertyApi {
  export async function getProperties(
    param: PropertyFilterParamsDto
  ): Promise<PropertyApiResponse.GetProperties> {
    const url = propertyUrls.getAndCreate;
    const method = http.get<PropertyDto[]>(url, param);
    return composeHttpMethodResult(method);
  }

  export async function createProperty(
    body: FormData
  ): Promise<PropertyApiResponse.CreateProperty> {
    const url = propertyUrls.getAndCreate;
    const method = http.post<PropertyDto>(url, body);
    return composeHttpMethodResult(method);
  }

  export async function deleteProperty(
    id: Property["id"]
  ): Promise<PropertyApiResponse.DeleteProperty> {
    const url = propertyUrls.updateAndDeleteWithId(id);
    const method = http.delete<boolean>(url);

    return composeHttpMethodResult(method);
  }

  export async function updateProperty(
    id: Property["id"],
    body: FormData
  ): Promise<PropertyApiResponse.UpdateProperty> {
    const url = propertyUrls.updateAndDeleteWithId(id);
    const method = http.patch<PropertyDto>(url, body);
    return composeHttpMethodResult(method);
  }
}
