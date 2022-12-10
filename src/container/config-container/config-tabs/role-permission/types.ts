import { UserPermissionConfigCreation } from "@/features/types";

export type RolePermissionForm = Pick<
  UserPermissionConfigCreation,
  "userId"
> & { type: string; roleManager: string[] };
