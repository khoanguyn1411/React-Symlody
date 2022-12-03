import { StrictOmit } from "@/utils/types";

export interface ITenantDto {
  id: number;
  name: string;
  abbreviation_name: string | null;
  email: string;
  phone_number: string;
  school: string;
  address: string;
  logo: string | null;
}

export type ITenantCreateUpdateDto = StrictOmit<ITenantDto, "id" | "logo"> & {
  logo: File | undefined;
};
