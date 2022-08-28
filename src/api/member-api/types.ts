import { IMemberCreateDto, IMemberDto } from "@/features/types/dtos";

import { GeneralApiProblem } from "../api-problem";

export type RequestCreateMemberBody = IMemberCreateDto;

export type RequestGetMembersResult =
  | {
      kind: `ok`;
      result: IMemberDto[];
    }
  | GeneralApiProblem;

export type RequestCreateMembersResult =
  | {
      kind: `ok`;
      result: IMemberDto;
    }
  | GeneralApiProblem;
