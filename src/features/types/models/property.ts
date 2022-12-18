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
  price: number;
  quantity: number;
  isClubProperty: boolean;
  note: string;
  archivedBy: number;
}

export type PropertyCreation = Pick<
  Property,
  | "name"
  | "quantity"
  | "price"
  | "propOwner"
  | "note"
  | "isClubProperty"
  | "isArchived"
> & { inChargerId: User["id"]; image: File | null };
