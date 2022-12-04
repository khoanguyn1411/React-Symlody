import { StrictPick } from "@/utils/types";

import { User } from "./user";

export interface Property {
  id: number;
  inCharger: User;
  createdBy: User;
  lastModifiedBy: string | null;
  image: string | null;
  organization: string;
  createdDate: string;
  lastModifiedDate: string;
  archivedDate: string;
  isArchived: boolean;
  propOwner: string;
  name: string;
  price: string;
  quantity: string;
  isClubProperty: boolean;
  note: string;
  archivedBy: number;
}

export type PropertyCreation = StrictPick<
  Property,
  "name" | "quantity" | "price" | "propOwner" | "note" | "isClubProperty"
> & { inChargerId: User["id"]; image: File | null };
