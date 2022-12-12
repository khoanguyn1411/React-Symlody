import { PropertyCreation } from "@/features/types";

export type PropertyForm = Pick<
  PropertyCreation,
  "name" | "inChargerId" | "note" | "propOwner"
> & { quantity: string; price: string; image: File; imageLink: string };

export type IPropertyTable = {
  assetName: string;
  quantity: number;
  price: string;
  inCharge: string;
  owner: string;
};
