import { IFormMemberInfo } from "@/container/member-container/type";
import { GlobalTypes } from "@/utils";

export type IFormUserConfig = GlobalTypes.StrictOmit<
  IFormMemberInfo,
  "department"
> & { avatar?: File; avatarUrl?: string };
