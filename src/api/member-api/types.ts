import { IMember } from "@/features/types/member-type";

import { GeneralApiProblem } from "../api-problem";

export type RequestCreateMemberBody = {
  auth_account: {
    first_name: string;
    last_name: string;
    email: string;
    groups: number[];
  };
  gender: number;
  dob: string;
  class_name: string;
  student_id: string;
  address: string;
  phone_number: string;
  home_town: string;
  department: number;
};

export type RequestGetMembersResult =
  | {
      kind: `ok`;
      result: IMember[];
    }
  | GeneralApiProblem;

export type RequestCreateMembersResult =
  | {
      kind: `ok`;
      result: IMember;
    }
  | GeneralApiProblem;
