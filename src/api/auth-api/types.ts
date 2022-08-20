import { IUser } from "@/features/types/dtos/user";

import { GeneralApiProblem } from "../api-problem";

export type RespondResult = {
  access: string;
  token_type: string;
  expires_in: string;
  refresh: string;
};

export type RequestLoginResult =
  | {
      kind: `ok`;
      result: RespondResult;
    }
  | GeneralApiProblem;

export type RequestGetProfileResult =
  | {
      kind: `ok`;
      result: IUser;
    }
  | GeneralApiProblem;
