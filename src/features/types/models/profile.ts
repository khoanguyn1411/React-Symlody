import { AuthAccount, AuthAccountCreation } from "./auth-account";
import { Department } from "./department";
import { Gender } from "./gender";
import { Organization } from "./organization";
export interface Profile extends AuthAccount {
  id: number;
  gender: Gender;
  phoneNumber: string;
  studentId: string;
  homeTown: string;
  dob: string;
  className: string;
  avatarUrl: string | null;
  address: string;
  department: Department;
  organization: Organization;
  memberId: number;
}

export type ProfileCreation = AuthAccountCreation & {
  avatar: File;
} & Pick<
    Profile,
    | "gender"
    | "dob"
    | "className"
    | "studentId"
    | "address"
    | "phoneNumber"
    | "homeTown"
  >;
