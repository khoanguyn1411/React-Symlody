import { ERoles } from "@/features/types";

export interface IFormMemberInfo {
  readonly firstName: string;
  readonly lastName: string;
  readonly gender: string;
  readonly birthday: string;
  readonly department: string;
  readonly role: ERoles[];
  readonly class: string;
  readonly studentId: string;
  readonly email: string;
  readonly phone: string;
  readonly address: string;
  readonly home: string;
}

export interface IMemberTable {
  readonly id: number;
  readonly avatar?: string;
  readonly name: string;
  readonly email: string;
  readonly department: string;
  readonly birthday: string;
  readonly roles: string;
}
