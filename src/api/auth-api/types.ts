import { ITokenDto, ITokenRefreshDto } from "@/features/types";
import { IUser } from "@/features/types/dtos/user";

import { GeneralApiProblem } from "../api-problem";

export type RequestLoginResult =
  | {
      kind: `ok`;
      result: ITokenDto;
    }
  | GeneralApiProblem;

export type RequestGetProfileResult =
  | {
      kind: `ok`;
      result: IUser;
    }
  | GeneralApiProblem;

export type RequestRefreshResult =
  | {
      kind: `ok`;
      result: ITokenRefreshDto;
    }
  | GeneralApiProblem;
