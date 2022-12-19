import { RecordObject } from "@/utils/types";

export type EntityValidationErrors<T, K = undefined> = {
  [P in keyof T]?: K extends P ? PropValidationMessage<T[P]> : string;
};

/**
 * Validation message type for specific property type.
 * Could be a just error message for simple field or nested validation error for composite fields.
 */
export type PropValidationMessage<T> = T extends unknown[]
  ? string
  : T extends RecordObject
  ? EntityValidationErrors<T>
  : string;

export type HttpError<
  T,
  P extends keyof T = undefined
> = EntityValidationErrors<T, P> & { nonFieldErrors?: string };
