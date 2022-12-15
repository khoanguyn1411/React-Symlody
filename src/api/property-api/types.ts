import { PropertyCreationDto, PropertyDto } from "@/features/types/dtos";

import { Response } from "../api-response";

export type RequestGetPropertiesResult = Response<PropertyDto[]>;
export type RequestCreatePropertyResult = Response<
  PropertyDto,
  PropertyCreationDto
>;
export type RequestDeletePropertyResult = Response<boolean>;
export type RequestUpdatePropertyResult = Response<
  PropertyDto,
  PropertyCreationDto
>;
