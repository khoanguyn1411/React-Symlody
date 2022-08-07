export type TFormMemberInfo = {
  fullName: string;
  gender: string;
  birthday: string;
  department: string;
  role: string[];
  class: string;
  studentId: string;
  email: string;
  phone: string;
  address: string;
  home: string;
};

export interface IMemberTable {
  id: number;
  avatar?: string;
  name: string;
  email: string;
  department: string;
  birthday: string;
  roles: string;
}
