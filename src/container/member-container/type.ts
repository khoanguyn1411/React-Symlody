export interface IFormMemberInfo {
  firstName: string;
  lastName: string;
  gender: string;
  birthday: string;
  department?: string;
  class: string;
  studentId: string;
  email: string;
  phone: string;
  address: string;
  home: string;
  avatar?: File;
}

export interface IMemberTable {
  id: number;
  firstName: string;
  avatar?: string;
  fullName: string;
  email: string;
  department: string;
  birthday: string;
  roles: string;
}
