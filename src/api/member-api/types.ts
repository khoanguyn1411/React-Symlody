import { IMember, IMemberPost } from "@/features/types/member-type";

import { GeneralApiProblem } from "../api-problem";

export type RequestCreateMemberBody = IMemberPost;

export type RequestGetMembersResult =
  | {
      kind: `ok`;
      result: IMember[];
    }
  | GeneralApiProblem;

export type RequestCreateMembersResult =
  | {
      kind: `ok`;
      result: IMemberPost;
    }
  | GeneralApiProblem;
