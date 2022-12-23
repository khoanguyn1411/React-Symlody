import { StrictOmit } from "@/utils/types";

import { AuthAccount, AuthAccountCreation } from "./auth-account";
import { Department } from "./department";
import { Gender } from "./gender";

export interface Member {
  id: number;
  authAccount: AuthAccount;
  lastModifiedDate: string;
  avatarUrl: string;
  createdBy: Pick<AuthAccount, "firstName" | "lastName">;
  department: Department;

  gender: Gender;
  className: string;
  studentId: string;
  address: string;
  phoneNumber: string;
  homeTown: string;
  dob: string;
  isArchived: boolean;
}

export type MemberCreation = StrictOmit<
  Member,
  | "authAccount"
  | "department"
  | "avatarUrl"
  | "id"
  | "lastModifiedDate"
  | "createdBy"
> & {
  authAccount: AuthAccountCreation;
  department?: Department;
};
