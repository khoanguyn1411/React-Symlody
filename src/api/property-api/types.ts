import { IPropertyDto } from "@/features/types/dtos";

import { Response } from "../types";

export type RequestGetPropertiesResult = Response<IPropertyDto[]>;
export type RequestCreatePropertyResult = Response<IPropertyDto>;
export type RequestDeletePropertyResult = Response<boolean>;
