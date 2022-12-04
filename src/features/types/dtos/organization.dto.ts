import { StrictOmit } from "@/utils/types";

export interface OrganizationDto {
  id: number;
  name: string;
  abbreviation_name: string | null;
  email: string;
  phone_number: string;
  school: string;
  address: string;
  logo: string | null;
}

export type OrganizationCreationDto = StrictOmit<
  OrganizationDto,
  "id" | "logo"
> & {
  logo: File | undefined;
};
