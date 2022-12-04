import { Roles } from "..";

export interface IsRole {
  isRole: (roles: Roles[] | "manager" | "member") => boolean;
}
