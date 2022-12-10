import { ProfileCreation } from "@/features/types";

export type PersonalInfoForm = ProfileCreation & {
  avatarUrl: string;
};
