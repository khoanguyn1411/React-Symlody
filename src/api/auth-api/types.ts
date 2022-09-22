import { ITokenDto, ITokenRefreshDto, IUserDto } from "@/features/types";

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
      result: IUserDto;
    }
  | GeneralApiProblem;

export type RequestRefreshResult =
  | {
      kind: `ok`;
      result: ITokenRefreshDto;
    }
  | GeneralApiProblem;
