import { StrictOmit } from "@/utils/types";

export interface ITenantDto {
  readonly id: number;
  readonly name: string;
  readonly abbreviation_name: string | null;
  readonly email: string;
  readonly phone_number: string;
  readonly school: string;
  readonly address: string;
  readonly logo: string | null;
}

export type ITenantCreateUpdateDto = StrictOmit<ITenantDto, "id" | "logo"> & {
  logo: File | undefined;
};
