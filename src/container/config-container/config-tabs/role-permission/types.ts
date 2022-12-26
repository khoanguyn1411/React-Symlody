import { UserShort } from "@/features/types";

export type RolePermissionForm = {
  type: string;
  roleManager: string[];
  userId: UserShort["id"];
};
