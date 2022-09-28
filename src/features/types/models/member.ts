import { IDepartment, IDepartmentCreateUpdate } from "./department";

interface IMemberGeneral {
  readonly gender: "Nam" | "Nữ";
  readonly class_name: string;
  readonly student_id: string;
  readonly address: string;
  readonly phone_number: string;
  readonly home_town: string;
  readonly dob: string;
  readonly is_archived: boolean;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly full_name?: string;
  readonly groups: string[];
}

export interface IMember extends IMemberGeneral {
  readonly id: number;
  readonly last_modified_date: string;
  readonly created_by: number;
  readonly department: IDepartment;
}

export interface IMemberCreateUpdate extends IMemberGeneral {
  readonly department: IDepartmentCreateUpdate;
}
