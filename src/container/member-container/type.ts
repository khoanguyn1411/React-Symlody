import { AuthAccountCreation, MemberCreation } from "@/features/types";
import { StrictOmit } from "@/utils/types";

export type AuthAccountForm = AuthAccountCreation;

export type MemberForm = StrictOmit<
  MemberCreation,
  "department" | "isArchived"
> & {
  department: string;
};

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
