import { StrictPick } from "@/utils/types";

import { IAuthAccount, IAuthAccountCreateUpdate } from "./auth-account";
import { IDepartment } from "./department";
import { EGender } from "./gender";
import { ERoles } from "./group";
import { ITenant } from "./tenant";
export interface IProfile extends IAuthAccount {
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

export type IProfileUpdate = IAuthAccountCreateUpdate & {
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
