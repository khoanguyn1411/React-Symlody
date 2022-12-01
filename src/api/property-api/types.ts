import { IPropertyCreateUpdateDto, IPropertyDto } from "@/features/types/dtos";

import { Response } from "../api-response";

export type RequestGetPropertiesResult = Response<IPropertyDto[]>;
export type RequestCreatePropertyResult = Response<
  IPropertyDto,
  IPropertyCreateUpdateDto
>;
export type RequestDeletePropertyResult = Response<boolean>;
