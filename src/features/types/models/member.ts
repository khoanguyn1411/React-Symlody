import { IAuthAccount } from "./auth-account";
import { IDepartment, IDepartmentCreateUpdate } from "./department";

interface IMemberGeneral {
  readonly auth_account: IAuthAccount;
  readonly gender: "Nam" | "Nữ";
  readonly class_name: string;
  readonly student_id: string;
  readonly address: string;
  readonly phone_number: string;
  readonly home_town: string;
  readonly dob: string;
}

export interface IMember extends IMemberGeneral {
  readonly id: number;
  readonly last_modified_date: string;
  readonly created_by: number;
  readonly department: IDepartment;
}

export interface IMemberCreate extends IMemberGeneral {
  readonly is_archived: boolean;
  readonly department: IDepartmentCreateUpdate;
}

export type IMemberUpdate = Omit<IMemberCreate, "id"> & {
  readonly department: IDepartmentCreateUpdate;
};
