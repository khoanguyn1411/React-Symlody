import { IDepartmentDto, ITenantDto } from "@/features/types/dtos";

import { GeneralApiProblem } from "../api-problem";

export type RequestGetDepartmentResult =
  | {
      kind: `ok`;
      result: IDepartmentDto[];
    }
  | GeneralApiProblem;

export type RequestGetTenantResult =
  | {
      kind: `ok`;
      result: ITenantDto;
    }
  | GeneralApiProblem;
