import { StrictPick } from "@/utils/types";

import { IAuthAccount, IAuthAccountCreateUpdate } from "./auth-account";
import { IDepartment } from "./department";
import { EGender } from "./gender";
import { ERoles } from "./group";
import { ITenant } from "./tenant";
export interface IProfile extends IAuthAccount {
  readonly id: number;
  readonly gender: EGender;
  readonly phone_number: string;
  readonly student_id: string;
  readonly home_town: string;
  readonly dob: string;
  readonly class_name: string;
  readonly avatar: string | null;
  readonly address: string;
  readonly department: IDepartment;
  readonly organization: ITenant;
  readonly profile_id: number;
  readonly isRole: (roles: ERoles[]) => boolean;
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
