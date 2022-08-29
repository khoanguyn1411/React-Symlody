import {
  IMemberCreateDto,
  IMemberDto,
  IMemberUpdateDto,
} from "@/features/types/dtos";

import { GeneralApiProblem } from "../api-problem";

export type RequestCreateMemberBody = IMemberCreateDto;
export type RequestUpdateMemberBody = IMemberUpdateDto;

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
      result: unknown;
    }
  | GeneralApiProblem;

export type RequestUpdateMembersResult = RequestCreateMembersResult;
