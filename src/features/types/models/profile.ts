import { StrictPick } from "@/utils/types";

import { AuthAccount, AuthAccountCreation } from "./auth-account";
import { IDepartment } from "./department";
import { EGender } from "./gender";
import { ERoles } from "./group";
import { ITenant } from "./tenant";
export interface IProfile extends AuthAccount {
  id: number;
  gender: EGender;
  phone_number: string;
  student_id: string;
  home_town: string;
  dob: string;
  class_name: string;
  avatar: string | null;
  address: string;
  department: IDepartment;
  organization: ITenant;
  profile_id: number;
  isRole: (roles: ERoles[]) => boolean;
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
