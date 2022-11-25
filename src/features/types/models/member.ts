import { IAuthAccount, IAuthAccountCreateUpdate } from "./auth-account";
import { IDepartment } from "./department";
import { EGender } from "./gender";

interface IMemberGeneral {
  readonly gender: EGender;
  readonly class_name: string;
  readonly student_id: string;
  readonly address: string;
  readonly phone_number: string;
  readonly home_town: string;
  readonly dob: string;
  readonly is_archived: boolean;
}

export interface IMember extends IMemberGeneral {
  readonly auth_account: IAuthAccount;
  readonly id: number;
  readonly last_modified_date: string;
  readonly avatar: string;
  readonly created_by: {
    readonly first_name: string;
    readonly last_name: string;
  };
  readonly department: IDepartment;
}

export interface IMemberCreateUpdate extends IMemberGeneral {
  readonly auth_account: IAuthAccountCreateUpdate;
  readonly department?: IDepartment;
  readonly avatar?: File;
}
