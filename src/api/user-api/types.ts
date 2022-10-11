import { IUserDto } from "@/features/types/dtos";

import { GeneralApiProblem } from "../api-problem";

export type RequestGetUsersResult =
  | {
      kind: `ok`;
      result: IUserDto[];
    }
  | GeneralApiProblem;
