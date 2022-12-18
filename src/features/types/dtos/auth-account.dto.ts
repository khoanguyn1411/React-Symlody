import { StrictOmit } from "@/utils/types";

import { GroupDto } from "./group.dto";

export interface AuthAccountDto {
  email?: string;
  first_name: string;
  groups: GroupDto[];
  last_name: string;
}

export type AuthAccountCreationDto = StrictOmit<AuthAccountDto, "groups">;
