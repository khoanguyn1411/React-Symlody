import { StrictOmit } from "@/utils/types";

export interface ITenant {
  id: number;
  name: string;
  abbreviation_name: string | null;
  email: string;
  phone_number: string;
  school: string;
  address: string;
  logo: string | null;
}

export type ITenantCreateUpdate = StrictOmit<ITenant, "id" | "logo"> & {
  logo: File | undefined;
};
