import { IMemberCreateUpdateDto, IMemberDto } from "@/features/types/dtos";

import { GeneralApiProblem } from "../api-problem";

export type RequestCreateMemberBody = IMemberCreateUpdateDto;
export type RequestUpdateMemberBody = IMemberCreateUpdateDto;

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

export type RequestDeleteMembersResult =
  | {
      kind: `ok`;
      result: boolean;
    }
  | GeneralApiProblem;

export type RequestUpdateMembersResult = RequestCreateMembersResult;
