import { GlobalTypes } from "@/utils";

import { GroupDto } from "./group.dto";

export interface AuthAccountDto {
  email?: string;
  first_name: string;
  groups: GroupDto[];
  last_name: string;
}

export type AuthAccountCreationDto = GlobalTypes.StrictOmit<
  AuthAccountDto,
  "groups"
>;
