import { StrictPick } from "@/utils/types";

import { AuthAccount, AuthAccountCreation } from "./auth-account";
import { Department } from "./department";
import { Gender } from "./gender";
import { Roles } from "./group";
import { Organization } from "./organization";
export interface IProfile extends AuthAccount {
  id: number;
  gender: Gender;
  phone_number: string;
  student_id: string;
  home_town: string;
  dob: string;
  class_name: string;
  avatar: string | null;
  address: string;
  department: Department;
  organization: Organization;
  profile_id: number;
  isRole: (roles: Roles[]) => boolean;
}

export type IProfileUpdate = AuthAccountCreation & {
  avatar?: File;
} & StrictPick<
    IProfile,
    | "gender"
    | "dob"
    | "class_name"
    | "student_id"
    | "address"
    | "phone_number"
    | "home_town"
  >;
