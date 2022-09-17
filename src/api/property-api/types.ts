import { IPropertyDto } from "@/features/types/dtos";

import { GeneralApiProblem } from "../api-problem";

export type RequestGetPropertiesResult =
  | {
      kind: `ok`;
      result: IPropertyDto[];
    }
  | GeneralApiProblem;