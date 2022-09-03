import { IDepartmentDto } from "@/features/types/dtos";

import { GeneralApiProblem } from "../api-problem";

export type RequestGetDepartmentResult =
  | {
      kind: `ok`;
      result: IDepartmentDto[];
    }
  | GeneralApiProblem;
