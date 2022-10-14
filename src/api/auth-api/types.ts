import { IProfileDto, ITokenDto, ITokenRefreshDto } from "@/features/types";

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
      result: IProfileDto;
    }
  | GeneralApiProblem;

export type RequestRefreshResult =
  | {
      kind: `ok`;
      result: ITokenRefreshDto;
    }
  | GeneralApiProblem;

export type RequestChangePasswordResult =
  | {
      kind: `ok`;
      result: boolean;
    }
  | GeneralApiProblem;
