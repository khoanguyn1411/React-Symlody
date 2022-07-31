export interface IMember {
  id: number;
  auth_account: {
    first_name: string;
    last_name: string;
    email: string;
    groups: number[];
  };
  gender: number;
  dob: string;
  class_name: string;
  student_id: string;
  address: string;
  phone_number: string;
  home_town: string;
  last_modified_date: string;
  created_by: number;
  department: {
    id: number;
    name: string;
  };
}
