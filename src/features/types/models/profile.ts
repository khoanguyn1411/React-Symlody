import { StrictPick } from "@/utils/types";

import { AuthAccount, AuthAccountCreation } from "./auth-account";
import { Department } from "./department";
import { Gender } from "./gender";
import { IsRole } from "./is-role";
import { Organization } from "./organization";
export interface Profile extends AuthAccount, IsRole {
  id: number;
  gender: Gender;
  phoneNumber: string;
  studentId: string;
  homeTown: string;
  dob: string;
  className: string;
  avatar: string | null;
  address: string;
  department: Department;
  organization: Organization;
  memberId: number;
}

export type ProfileCreation = AuthAccountCreation & {
  avatar?: File;
} & StrictPick<
    Profile,
    | "gender"
    | "dob"
    | "className"
    | "studentId"
    | "address"
    | "phoneNumber"
    | "homeTown"
  >;
