import { IMemberDto, IMemberDtoCU } from "@/features/types/dtos";

import { GeneralApiProblem } from "../api-problem";

export type RequestCreateMemberBody = IMemberDtoCU;

export type RequestGetMembersResult =
  | {
      kind: `ok`;
      result: IMemberDto[];
    }
  | GeneralApiProblem;

export type RequestCreateMembersResult =
  | {
      kind: `ok`;
      result: IMemberDtoCU;
    }
  | GeneralApiProblem;
