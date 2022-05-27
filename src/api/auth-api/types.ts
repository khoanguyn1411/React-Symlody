import { IUser } from "@/features";

import { GeneralApiProblem } from "../api-problem";

export type RequestLoginResult =
  | {
      kind: `ok`;
      result: {
        token: string;
      };
    }
  | GeneralApiProblem;

export type RequestGetProfileResult =
  | {
      kind: `ok`;
      result: IUser;
    }
  | GeneralApiProblem;
