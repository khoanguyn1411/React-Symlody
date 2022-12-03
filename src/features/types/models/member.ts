import { AuthAccount, AuthAccountCreation } from "./auth-account";
import { IDepartment } from "./department";
import { EGender } from "./gender";

interface IMemberGeneral {
  gender: EGender;
  class_name: string;
  student_id: string;
  address: string;
  phone_number: string;
  home_town: string;
  dob: string;
  is_archived: boolean;
}

export interface IMember extends IMemberGeneral {
  auth_account: AuthAccount;
  id: number;
  last_modified_date: string;
  avatar: string;
  created_by: {
    first_name: string;
    last_name: string;
  };
  department: IDepartment;
}

export interface IMemberCreateUpdate extends IMemberGeneral {
  auth_account: AuthAccountCreation;
  department?: IDepartment;
  avatar?: File;
}
