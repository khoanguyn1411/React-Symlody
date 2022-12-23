import { PropertyCreationDto, PropertyDto } from "@/features/types/dtos";

import { Response } from "../api-response";

export namespace PropertyApiResponse {
  export type GetProperties = Response<PropertyDto[]>;
  export type CreateProperty = Response<PropertyDto, PropertyCreationDto>;
  export type DeleteProperty = Response<boolean>;
  export type UpdateProperty = Response<PropertyDto, PropertyCreationDto>;
}
