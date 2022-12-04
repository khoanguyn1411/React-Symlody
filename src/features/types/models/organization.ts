import { StrictOmit } from "@/utils/types";

export interface Organization {
  id: number;
  name: string;
  abbreviationName: string | null;
  email: string;
  phoneNumber: string;
  school: string;
  address: string;
  logo: string | null;
}

export type OrganizationCreation = StrictOmit<Organization, "id" | "logo"> & {
  logo: File | null;
};
