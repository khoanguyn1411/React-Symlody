import { StrictOmit, StrictPick } from "@/utils/types";

import { AuthAccount, AuthAccountCreation } from "./auth-account";
import { Department } from "./department";
import { EGender } from "./gender";

export interface Member {
  id: number;
  authAccount: AuthAccount;
  lastModifiedDate: string;
  avatar: string;
  createdBy: StrictPick<AuthAccount, "firstName" | "lastName">;
  department: Department;

  gender: EGender;
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
  | "avatar"
  | "id"
  | "lastModifiedDate"
  | "createdBy"
> & {
  authAccount: AuthAccountCreation;
  department?: Department;
  avatar?: File;
};
